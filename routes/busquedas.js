/*

    ruta: api/Busqueda/
*/
const { Router } = require('express');

const { getBusqueda, getDocumentosColeccion } = require('../controllers/busquedas');


const router = Router();


router.get('/:busqueda',   getBusqueda );

router.get('/coleccion/:tabla/:busqueda',   getDocumentosColeccion );


module.exports = router;