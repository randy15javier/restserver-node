const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Doctor = require('../models/doctor');  
const app = express();

app.get('/doctor', function (req, res) {
    // res.json('get doctor ostia')

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Doctor.find({estado: true}, 'nombre email role estado google img')
              .skip(desde)
              .limit(limite)
              .exec((err, doctores) => {
                 
                  if (err) {
                    return res.status(400).json({
                      ok: false,
                      err
                    });
                  }
                  
                  Doctor.count({estado: true}, (err, conteo) => {
                    res.json({
                      ok: true,
                      doctores,
                      cuantos: conteo
                    });
                  })


              })
  })
  
app.post('/doctor', function (req, res) {
    let body = req.body;

    let doctor = new Doctor({
      nombre: body.nombre,
      email: body.email,
      password: bcrypt.hashSync (body.password, 10),
      role: body.role
    });

    doctor.save((err, doctorDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      // doctorDB.password = null;

      res.json({
        ok:true,
        doctor: doctorDB
      });

    });
    
  })
  
app.put('/doctor/:id', function (req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre','email', 'img','role', 'estado']);
    
    delete body.password;
    delete body.google;

    Doctor.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, doctorDB) => {
      
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }
      
      res.json({
        ok: true,
        doctor: doctorDB
      });
    })

  });
  
app.delete('/doctor/:id', function (req, res) {
    let id = req.params.id;

    // Doctor.findByIdAndRemove(id, (err, doctorBorrado) =>{
    
    let cambiaEstado = {
      estado: false
    };
    
    Doctor.findByIdAndUpdate(id, cambiaEstado, {new: true}, (err, doctorBorrado) =>{
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      };

      if (!doctorBorrado){
        return res.status(400).json({
          ok: false,
          err: {
            message: 'Doctor no encontrado'
          }
        });
      }

      res.json({
        ok:true,
        doctor: doctorBorrado
      });
    });
  
  
  // res.json('delete doctor')
  })


  module.exports = app;