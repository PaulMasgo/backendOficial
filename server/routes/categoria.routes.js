const express = require('express');
const fileupload = require('express-fileupload');
const path = require('path');
const app = express();
const Categoria = require('../models/categoria');


app.use(fileupload());

app.get('/categoria', (req, res) => {
    Categoria.find()
        .exec((err, categorias) => {
            if (err) {
                res.json(err)
            } else {
                res.json(categorias)
            };
        });
});

app.get('/categoria/:id', (req, res) => {
    let id = req.params.id;
    Categoria.findOne({ _id: id }, (err, usuario) => {
        if (err) {
            res.json(err)
        } else {
            res.json(usuario)
        }
    });
});

app.post('/categoria', (req, res) => {

    let contenido = req.body;

    let categoria = new Categoria({
        nombre: contenido.nombre,
        descripcion: contenido.descripcion,
        imagen: path.resolve(__dirname, '../../img/poleras/categoria.jpg')
    });

    categoria.save((err, usuario) => {
        if (err) {
            res.jason(err);
        } else {
            res.json(usuario);
        };
    });
});


app.put('/categoria/:id', (req, res) => {
    let id = req.params.id;
    let contenido = req.body;

    let categoria = {
        nombre: contenido.nombre,
        descripcion: contenido.descripcion,

    }


    Categoria.findByIdAndUpdate({ _id: id }, categoria, { new: true }, (err, usuario) => {
        if (err) {
            res.json(err)
        } else {
            res.json(usuario)
        }
    });
});


module.exports = app;