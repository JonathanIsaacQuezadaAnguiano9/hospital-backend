const { response } = require('express');

const Medico = require('../models/medico');

const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find()
                                .populate('usuario','nombre img')
                                .populate('hospital','nombre img')


    res.json({
        ok: true,
        medicos
    })
}

const crearMedico = async (req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });


    try {

        const medicoDB = await medico.save();

        
        res.json({
            ok: true,
            medico: medicoDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarMedico = async (req, res = response) => {
    try {
        const medico = await Medico.findById(id);
        if (!medico) {
            return res.status(404).json({
                ok: false, 
                msg: 'Medico no encontrado',
                id
            });
        }
        medico.nombre = req.body.nombre;
        medico.hospital = req.body.hospital; 
        
        const cambiosMedico= {
            ...req.body,
            usuario: uid
        }
        res.json({
            ok:true, 
            msg: 'Medico actualizado'
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Error al actualizar al medico'
        })
    }
}

const borrarMedico = async (req, res = response) => {
    try {
        const id = req.params.findById(id);
        if (!medico) {
            return res.status(404).json({
                ok:false,
                msg: 'Medico no encontrado',
                id
            });    
        }
        await Medico.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Medico eliminado por mala praxis '
        });
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Error al borra al medico (gano el juicio)'
        })
    }
    res.json({
        ok:true, 
        msg: 'Borrar medico =)'
    })
}



module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}