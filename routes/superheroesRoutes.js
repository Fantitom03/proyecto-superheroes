import express from 'express';
import { superheroValidationRules } from './validationRules.js';
import { handleValidationErrors } from './errorMiddleware.js';
import {obtenerSuperheroePorIdController, obtenerTodosLosSuperheroesController, buscarSuperheroesPorAtributoController,
     obtenerSuperheroesMayoresDe30Controller, crearSuperheroeController, actualizarSuperheroeController, 
     eliminarSuperheroePorIdController, eliminarSuperheroePorNombreController, agregarSuperheroeController,
     editarSuperheroeController, actualizarSuperheroeEditadoController, eliminarSuperheroeController 
     }from '../controllers/superheroesController.mjs';



const router = express.Router();


// GET: Obtener todos los superhéroes
router.get('/', obtenerTodosLosSuperheroesController);


// GET: Obtener un superhéroe por ID
router.get('/buscarID/:id', obtenerSuperheroePorIdController);


// GET: Mostrar formulario para agregar superhéroe
router.get('/agregar', (req, res) => { 
     res.render('addSuperhero', { title: 'Lista de Superhéroes'});
});


// POST: Agregar un nuevo superhéroe
router.post('/agregar', superheroValidationRules(), handleValidationErrors, (req, res) => {
     agregarSuperheroeController(req, res);
});


// GET: Obtener datos para precargar en la vista de edición
router.get('/:id/editar', editarSuperheroeController);


// POST: Ruta para actualizar un superhéroe EDITADO
router.post('/:id/editar', superheroValidationRules(), handleValidationErrors, (req,res) => {
     actualizarSuperheroeEditadoController(req, res)
});

// DELETE: Ruta para eliminar un superhéroe
router.delete('/:id', eliminarSuperheroeController);



//RUTAS SIN VISTAS



/*
// GET: Buscar superhéroes por atributo
router.get('/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);


// GET: Obtener superhéroes mayores de 30 años
router.get('/edad/mayores30', obtenerSuperheroesMayoresDe30Controller);


// POST: Crear un nuevo superhéroe
router.post(
     '/',
     superheroValidationRules(),
     handleValidationErrors,
     (req, res) => crearSuperheroeController(req, res)
 );
 
 // PUT: Actualizar un superhéroe por ID
 router.put(
     '/:id',
     superheroValidationRules(),
     handleValidationErrors,
     (req, res) => actualizarSuperheroeController(req, res)
 );


// DELETE: Borrar un superhéroe por ID
router.delete('/:id', (req, res) => eliminarSuperheroePorIdController(req, res));


// DELETE: Borrar un superhéroe por nombre
router.delete('/nombre/:nombre', (req, res) => eliminarSuperheroePorNombreController(req, res));

*/

export default router;