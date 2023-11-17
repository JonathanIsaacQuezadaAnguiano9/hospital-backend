const {Schema, model} = require ('mongoose');

const PasienteSchema = Schema ({
    nombre:{
        type: String,
        required: true
    },
    img: {
        type: String,
    },

    padecimiento:{
        type: String,
        required: true,
    },

    fechaIngreso:{
        type: Date,
        required: true,
    },

    fechaAlta:{
        type: Date,
        required: false
    },
    
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    hospital:{
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    },

});