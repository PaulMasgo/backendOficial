const mongoose = require('mongoose');

let esquema = mongoose.Schema;

let Producto = new esquema({
    nombre: { type: String, required: [true, 'el nombre es nesesario'] },
    descripcion: { type: String },
    precio: { type: Number, required: [true, 'el precio es obligatorio'] },
    cantidad: { type: Number },
    categoria: { type: esquema.Types.ObjectId, ref: 'Categoria', required: [true, 'El codigo de la categoria es nesesario'] },
    imagen: { type: esquema.Types.ObjectId, ref: 'Imagen' },
    estado: { type: Boolean, default: true }
});

module.exports = mongoose.model('Producto', Producto);