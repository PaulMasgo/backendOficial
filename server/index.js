const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

//cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
    next();
});




//Configurando las peticiones 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//llamando a las rutas
app.use(require('./routes/main.routes'));

//conectandose a mongoDB
mongoose.connect('mongodb://localhost/CresspoMen', { useNewUrlParser: true })
    .then(db => console.log('Estas conectado'))
    .catch(err => console.log(err))

//Iniciando el servidor 
app.listen(3000, () => {
    console.log('escuchando puerto 3000');
});