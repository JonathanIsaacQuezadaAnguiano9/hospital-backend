/*
    Medicos
    ruta: '/api/medico'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
} = require('../controllers/medicos')


const router = Router();

router.get( '/', getMedicos );

router.post( '/',
    [
        check('nombre','El nombre del médico es necesario').not().isEmpty(),
        check('hospital','El hospital id debe de ser válido').isMongoId(),
        validarCampos
    ], 
    crearMedico 
);

router.put( '/:id',
    [
        check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
        check('hospital', 'El nombre del hospital es requerido').not().isEmpty(),

    ],
    actualizarMedico
);

router.delete( '/:id',
    borrarMedico
);



module.exports = router;



