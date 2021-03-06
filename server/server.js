require('./config/config.js');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 
app.use( require('./routes/doctor') );
 
mongoose.connect(process.env.URLDB, (err, res) => {
  if (err) throw err;

  console.log('Base de datos Online');
});

app.listen(process.env.PORT, () => {
    console.log("Todo bien en el puerto: ", process.env.PORT);
})