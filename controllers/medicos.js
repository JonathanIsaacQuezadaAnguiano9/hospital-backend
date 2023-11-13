const { response } = require('express');

const Medico = require('../models/medico');
const { generarJWT } = require('../helpers/jwt');

const getMedicos = async (req, res) => {
    const medicos = await  Medico.find().populate('usuario', 'nombre img')
                                        .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        medicos
    });
}

const crearMedico = async (req, res = response) => {
    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {
        //guardado del medico
        const medicoDB =  await medico.save();

        //generarJWT 
        const token = await generarJWT(medico.id);

        res.json({
            ok: true,
            msg: 'Medico creado',
            medico: medicoDB,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear al medico ( no se titulo)'
        });
    }
}


const actualizarMedico = async (req, res = response) => {

    return res.json({
        ok: true,
        msg: 'EL medico se actualizo'
    });

}

const borrarMedico = async (req, res = response) => {
    return res.json({
        ok: true,
        msg: 'El medico se dio de baja',
    })
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
}