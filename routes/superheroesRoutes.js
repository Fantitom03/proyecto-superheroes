import express from 'express';
import { superheroValidationRules } from './validationRules.js';
import { handleValidationErrors } from './errorMiddleware.js';
import {obtenerSuperheroePorIdController, obtenerTodosLosSuperheroesController, buscarSuperheroesPorAtributoController,
     obtenerSuperheroesMayoresDe30Controller, crearSuperheroeController, actualizarSuperheroeController, 
     eliminarSuperheroePorIdController, eliminarSuperheroePorNombreController } from '../controllers/superheroesController.mjs';



const router = express.Router();


// GET: Obtener todos los superhéroes
router.get('/', obtenerTodosLosSuperheroesController);


// GET: Obtener un superhéroe por ID
router.get('/:id', obtenerSuperheroePorIdController);


// GET: Buscar superhéroes por atributo
router.get('/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);


// GET: Obtener superhéroes mayores de 30 años
router.get('/edad/mayores30', obtenerSuperheroesMayoresDe30Controller);


// POST: Crear un nuevo superhéroe
router.post('/', (req, res) => crearSuperheroeController(req, res));


// PUT: Actualizar un superhéroe por ID
router.put('/:id', (req, res) => actualizarSuperheroeController(req, res));


// DELETE: Borrar un superhéroe por ID
router.delete('/:id', (req, res) => eliminarSuperheroePorIdController(req, res));


// DELETE: Borrar un superhéroe por nombre
router.delete('/nombre/:nombre', (req, res) => eliminarSuperheroePorNombreController(req, res));


export default router;