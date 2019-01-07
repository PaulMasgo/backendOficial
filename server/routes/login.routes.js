const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const app = express();
const Usuario = require('../models/usuario')

app.post('/login', (req, res) => {

    let contenido = req.body;
    Usuario.findOne({ correo: contenido.correo }, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                error: err
            });
        }

        if (!usuario) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Correo no existe',
                error: err
            });
        }
        if (!bcrypt.compareSync(contenido.password, usuario.password)) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Contraseña no existe',
                error: err
            });
        } else {
            usuario.password = 'jaja se mamo';
            let token = jwt.sign({ usuario }, 'crrespo-app', { expiresIn: 144000 })

            res.status(200).json({
                ok: true,
                token,
                usuario: usuario,
                id: usuario._id
            });
        }


    })
});

module.exports = app;