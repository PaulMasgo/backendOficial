const mongoose = require('mongoose');

let esquema = mongoose.Schema;

let CategoriaEsquema = new esquema({
    nombre: { type: String, required: [true, 'El nombre es nesesario'] },
    descripcion: { type: String },
    imagen: { type: String }
});

module.exports = mongoose.model('Categoria', CategoriaEsquema);