const {Schema, model, Collection} = require('mongoose');

const MedicoSchema = Schema ({

    nombre: {
        type: String,
        required: true,
    },

    img: {
        type: String,
        required: false,
    },

    usuario:{
        type:Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },

    hospital:{
        type:Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }


}, {collection: 'Medicos'})

module.exports = model ('Medico', MedicoSchema);