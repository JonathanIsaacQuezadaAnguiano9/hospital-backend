/*

    ruta: api/todo/
*/
const { Router } = require('express');

const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas');


const router = Router();


router.get('/:busqueda' , getTodo );

router.get('/coleccion/:tabla/:busqueda' , getDocumentosColeccion );



module.exports = router;