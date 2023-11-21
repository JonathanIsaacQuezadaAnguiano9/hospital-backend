
const {Router} = require ('express');
const {check} = require ('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');

const {
    getPacientes,
    crearPaciente,
    actualizarPaciente,
} = require ('../controllers/pacientes')

const router = Router();

router.get('/', getPacientes);

router.post('/',
    [
        validarCampos,
    ],
    crearPaciente
);

router.put('/:id', 
    [
        check('hospital', 'El id del hospital es requerido').isMongoId(),
        validarCampos
    ],
    actualizarPaciente
);

module.exports = router;