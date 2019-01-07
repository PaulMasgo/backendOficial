const jwt = require('jsonwebtoken');

let verificar = {}

verificar.token = (req, res, next) => {
    let token = req.get('token');
    jwt.verify(token, 'crrespo-app', (err, decoded) => {
        if (err) {
            return res.status(401).json({ ok: true, err });
        } else {
            req.usuario = decoded.usuario;
            next();
        }
    })
};

module.exports = verificar;