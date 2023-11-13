const {Schema, model, } = require('mongoose');

const HospitalSchema = Schema ({

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
        require: true,
    }


}, )

module.exports = model ('Hospital', HospitalSchema);