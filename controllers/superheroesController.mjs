import {obtenerSuperheroePorID, obtenerTodosLosSuperheroes, buscarSuperheroesPorAtributo,
    obtenerSuperheroesMayoresDe30, crearSuperheroe, actualizarSuperheroePorId,
    eliminarSuperheroePorId, eliminarSuperheroePorNombre } from '../services/superheroesService.mjs';

import { renderizarSuperheroe, renderizarListaSuperheroes } from "../views/responseView.mjs";

//Obtener superheroe por ID
export async function obtenerSuperheroePorIdController(req, res) {
    try {
        const { id } = req.params;
        const superheroe = await obtenerSuperheroePorID(id);
        res.send(renderizarSuperheroe(superheroe));
    } catch (error) {
        res.status(500).send({
            mensaje: "Error al obtener el superhéroe por ID",
            error: error.message,
        });
    }
}

//Obtener todos los superheroes
export async function obtenerTodosLosSuperheroesController(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperheroes();
        res.send(renderizarListaSuperheroes(superheroes));
    } catch (error) {
        res.status(500).send({
            mensaje: "Error al obtener la lista de superhéroes",
            error: error.message,
        });
    }
}

//Buscar Superheroes por atributo
export async function buscarSuperheroesPorAtributoController(req, res) {
    try {
        const { atributo, valor } = req.params;
        const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);

        if (superheroes.length > 0) {
            res.send(renderizarListaSuperheroes(superheroes));
        } else {
            res.status(404).send({
                mensaje: "No se encontraron superhéroes con ese atributo",
            });
        }
    } catch (error) {
        res.status(500).send({
            mensaje: "Error al buscar superhéroes por atributo",
            error: error.message,
        });
    }
}


//Obtener superheroes mayores a 30
export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
    try {
        const superheroes = await obtenerSuperheroesMayoresDe30();
        res.send(renderizarListaSuperheroes(superheroes));
    } catch (error) {
        res.status(500).send({
            mensaje: "Error al obtener superhéroes mayores de 30",
            error: error.message,
        });
    }
}

// Crear un superheroe
export async function crearSuperheroeController(req, res) {
    try {
      const nuevoSuperHeroe = await crearSuperheroe(req.body);
      res.status(201).json(nuevoSuperHeroe);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

// Actualizar un superheroe
export async function actualizarSuperheroeController(req, res) {
    try {
      const { id } = req.params;
      const superHeroeActualizado = await actualizarSuperheroePorId(id, req.body);
      if (!superHeroeActualizado) {
        return res.status(404).json({ error: 'Superhéroe no encontrado' });
      }
      res.status(200).json(superHeroeActualizado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

// Eliminar un superheroe por ID
export async function eliminarSuperheroePorIdController(req, res) {
    try {
      const { id } = req.params;
      const superHeroeEliminado = await eliminarSuperheroePorId(id);
      if (!superHeroeEliminado) {
        return res.status(404).json({ error: 'Superhéroe no encontrado' });
      }
      res.status(200).json(superHeroeEliminado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

// Eliminar un superheroe por Nombre
export async function eliminarSuperheroePorNombreController(req, res) {
    try {
      const { nombre } = req.params;
      const superHeroeEliminado = await eliminarSuperheroePorNombre(nombre);
      if (!superHeroeEliminado) {
        return res.status(404).json({ error: 'Superhéroe no encontrado' });
      }
      res.status(200).json(superHeroeEliminado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

