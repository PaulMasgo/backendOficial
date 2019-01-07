const express = require('express');
const app = express();

const fileUpload = require('express-fileupload');
app.use(fileUpload());



app.post('/upload', (req, res) => {
    console.log(req.files);
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No seleciono nada',
            error: 'Debe selecionar algo'
        });
    }

    //Obtener nombre del archivo
    let archivo = req.files.imagen;

    let nombreSeparado = archivo.name.split('.');
    let extension = nombreSeparado[nombreSeparado.length - 1];

    //Extensiones Validas
    let Validas = ['png', 'jpg', 'jpeg'];

    if (Validas.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Extension no valida',
            error: 'Las extensiones validas son png,jpg,jpeg'
        });
    }
});

module.exports = app;