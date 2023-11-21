const { response } = require('express');

const Paciente = require('../models/paciente');

const getPacientes = async (req, res= response) => {
    
    const pacientes = await Paciente.find()
                                .populate('hospital', 'nombre img')
                                .populate('usuario', 'nombre img')
                                .populate('medico', 'nombre img')
        res.json({
            ok: true,
            pacientes
        })

}

const crearPaciente = async ( req, res = response) =>{

    const uid = req.uid;
    const paciente = new Paciente(req.body);

    try {

        const pacienteDB = await paciente.save();
        
        res.json({
            ok: true,
            paciente: pacienteDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear al paciente'
        });
    }
}

const actualizarPaciente = async (req, res = response) =>{
    const id = req.params.id;
    const uid = req.uid;
    try {
        const paciente = await Paciente.findById(id);
        if (!paciente) {
            return res.status(404).json({
                ok: true,
                msg: 'Paciente no encontrado',
                id
            });
        }
        const cambioPaciente = {
            ...req.body,
            usuario: uid
        }
        const pacienteActualizado = await Paciente.findByIdAndUpdate(id, cambioPaciente, {new: true});

        res.json({
            ok:true,
            paciente: pacienteActualizado
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Error al actualizar al paciente'
        })
    }
}

module.exports={
    getPacientes,
    crearPaciente,
    actualizarPaciente
}