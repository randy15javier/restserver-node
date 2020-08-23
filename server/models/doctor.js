const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'DOCTOR_ROLE'],
    message: '{VALUE} no es un role válido'
};

let Schema = mongoose.Schema;

let doctorSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String, 
        required: false
    },
    role: {
        type: String,
        default: 'DOCTOR_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

doctorSchema.methods.toJSON = function() {
    let doctor = this;
    let doctorObject = doctor.toObject();
    delete doctorObject.password;

    return doctorObject;
}

doctorSchema.plugin(uniqueValidator, { message:  '{PATH} debe de ser único ' });

module.exports = mongoose.model('Doctor', doctorSchema);