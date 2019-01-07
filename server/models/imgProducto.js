const mongoose = require('mongoose');

let esquema = mongoose.Schema;

let imagenEsquema = new esquema({
    principal: { type: String, required: [true, 'Esta imagen es nsesaria'] },
    lado1: { type: String, required: [true, 'Esta imagen es nsesaria'] },
    lado2: { type: String },
    lado2: { type: String }
});

module.exports = mongoose.model('Imagen', imagenEsquema);