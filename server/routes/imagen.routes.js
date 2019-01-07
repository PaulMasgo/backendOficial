const express = require('express');
const app = express();
const path = require('path');
const fileupload = require('express-fileupload');
const Imagen = require('../models/imgProducto');


app.use(fileupload());

app.get('/imagen', (req, res) => {
    Imagen.find()
        .exec((err, imagenes) => {
            if (err) {
                res,
                json(err)
            }
            else {
                res.json(imagenes)
            }
        });
});

app.post('/imagen', (req, res) => {

    let contenido = req.body;

    let imagen = new Imagen({
        principal: contenido.principal,
        lado1: contenido.lado1,
        lado2: contenido.lado2,
        lado3: contenido.lado3
    });

    imagen.save((err, imagen) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error guardando imagnes',
                error: err
            });
        } else {
            res.status(200).json({
                ok: true,
                imagen
            });
        };
    })

});




module.exports = app;