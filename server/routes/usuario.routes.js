const express = require('express');
const app = express();
const bcrpyt = require('bcryptjs');
const path = require('path');
const Usuario = require('../models/usuario');
const verficacion = require('../middlewares/autenticacion');


// *********** Obtener todos los usuarios **************
app.get('/usuario', [verficacion.token], (req, res) => {
    Usuario.find({ estado: true }, 'nombre correo imagen')
        .exec((err, usuarios) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al listar usuario',
                    error: err
                });
            } else {
                return res.status(200).json({
                    ok: true,
                    usuarios
                });
            };
        });
});

//************ Obtener un solo usuario *************/
app.get('/usuario/:id', (req, res) => {

    let id = req.params.id;

    Usuario.findOne({ _id: id }, (err, usuario) => {
        if (err) { return res.json({ ok: false, error: err }) } else { return res.json(usuario) }
    });

});

//**************** Crear nuevo usuario ****************
app.post('/usuario', (req, res) => {

    let contenido = req.body;

    let usuario = new Usuario({
        nombre: contenido.nombre,
        correo: contenido.correo,
        password: bcrpyt.hashSync(contenido.password),
        tipo: contenido.tipo,
        imagen: 'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?resize=256%2C256&quality=100&ssl=1'
    });

    usuario.save((err, usuario) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al guardar usuario',
                error: err
            });
        } else {
            return res.status(200).json({
                ok: true,
                usuario
            });
        };
    });
});






// ********** Actualizar ****************
app.put('/usuario/:id', (req, res) => {

    let id = req.params.id;
    let contenido = req.body;

    let usuario = {
        nombre: contenido.nombre,
        password: bcrpyt.hashSync(contenido.password, 10),
        tipo: contenido.tipo
    };

    Usuario.findOneAndUpdate({ _id: id }, usuario, { new: true }, (err, usuario) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al actualizar usuario',
                error: err
            });
        } else {
            return res.status(200).json({
                ok: true,
                usuario
            });
        };
    });
});

module.exports = app;