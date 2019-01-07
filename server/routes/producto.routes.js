const express = require('express');
const app = express();
const Producto = require('../models/producto');

app.get('/producto', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    Producto.find({ estado: true })
        .skip(desde)
        .limit(5)
        .populate('imagen categoria')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando productos',
                    error: err
                });
            } else {
                res.status(200).json({
                    ok: true,
                    Productos: productos,
                    Total: productos.length
                });
            };
        });
});


app.get('/producto/buscar/:params', (req, res) => {

    let letra = req.params.params;
    let regex = new RegExp(letra, 'i');

    Producto.find({ nombre: regex, estado: true })
        .populate('imagen categoria', )
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando productos',
                    error: err
                });
            } else {
                res.status(200).json({
                    ok: true,
                    Productos: productos,
                    Total: productos.length
                });
            };
        })
});


app.get('/producto/:id', (req, res) => {

    let id = req.params.id;
    Producto.findOne({ _id: id })
        .populate('imagen categoria', )
        .exec((err, producto) => {
            if (err) {
                res.json(err)
            } else {
                res.json(producto)
            }
        })

});

app.post('/producto', (req, res) => {
    let contenido = req.body;

    let producto = new Producto({
        nombre: contenido.nombre,
        descripcion: contenido.descripcion,
        precio: contenido.precio,
        imagen: contenido.imagen,
        categoria: contenido.categoria
    });

    producto.save((err, product) => {
        if (err) {
            res.json(err);
        } else {
            res.json(product);
        };
    });

});


app.put('/producto/:id', (req, res) => {

    let id = req.params.id;
    let contenido = req.body;

    let producto = {
        nombre: contenido.nombre,
        descripcion: contenido.descripcion,
        precio: contenido.precio,
        cantidad: contenido.cantidad,
        categoria: contenido.categoria
    };

    Producto.findByIdAndUpdate({ _id: id }, producto, { new: true }, (err, usuario) => {
        if (err) {
            res.json(err);
        } else {
            res.json(usuario)
        }
    })
});

app.delete('/producto/:id', (req, res) => {
    let id = req.params.id;
    Producto.findByIdAndUpdate({ _id: id }, { estado: false }, { new: true }, (err, product) => {
        if (err) {
            res.json(err)
        } else {
            res.json(product);
        }
    });
});

module.exports = app