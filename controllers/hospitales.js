const { response } = require('express');
const bcrypt = require('bcryptjs');

const Hospital = require('../models/hospital');
const { generarJWT } = require('../helpers/jwt');

const getHospital = async (req, res) => {
    const hospitales = await Hospital.find().populate('usuario', 'nombre img');
    res.json({
        ok: true,
        hospitales
    });

}

const crearHospital = async (req, res = response) => {
    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid, 
        ...req.body});
    const { nombre } = req.body;
    
    try {
        const existHospital = await Hospital.findOne({ nombre });
        if (existHospital) {
            return res.status(400).json({
                ok: false,
                msg: 'El hospital ya existe'
            });
        }
        

        //Guardar hospital
        const  hospitalDB = await hospital.save();

        const token = await generarJWT(hospital.id);
        res.json({
            ok: true,
            hospital: hospitalDB,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}

const actualizarHospital = async (req, res) => {
    const uid = req.params.id;
    try 
    {
        const hospitalDB = await Hospital.findById(uid);
        if (!hospitalDB) 
        {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el hospital'
            })
        }
        const {nombre, ...campos} = req.body;
        if (hospitalDB.nombre!=nombre)
        {
            const existeNombre = await Hospital.findOne({nombre});
            if (existeNombre)
            {
                return res.status(400).json({
                    ok: false, 
                    msg: 'Ya existe este hospital'
                });
            }

        }
        campos.nombre = nombre;
        const hospitalActualizado = await Hospital.findAndUpdate(uid, campos, {new: true});
        ews.json({
            ok: true,
            hospital: hospitalActualizado,
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
    res.json({
        ok: true,
        msg: 'actualizarHospitales'
    });

}

const borrarHospital = async (req, res) => {
    const hospitales = await Hospital.find({}, 'nombre');
    res.json({
        ok: true,
        msg: 'Borrar hospitales'
    });

}

module.exports = {
    crearHospital,
    getHospital,
    actualizarHospital,
    borrarHospital
}