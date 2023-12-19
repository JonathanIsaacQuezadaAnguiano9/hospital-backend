const {Schema, model} = require ('mongoose');

const PacienteSchema = Schema ({
    nombre:{
        type: String,
        required: false
    },
    img: {
        type: String,
    },

    padecimiento:{
        type: String,
        required: false,
    },

    fechaIngreso:{
        type: String,
        required: false,
    },

    fechaAlta:{
        type: Date,
        required: false
    },
    
    medico:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: false,
    },
    hospital:{
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: false
    },

});

module.exports = model('Paciente', PacienteSchema);