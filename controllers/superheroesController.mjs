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
    res.render('dashboard', { title: 'Lista de Superhéroes', superheroes }); // Renderizar la vista con los datos
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al obtener la lista de superhéroes",
      error: error.message,
    });
  }
}


// Crear un nuevo superhéroe
export async function agregarSuperheroeController(req, res) {
  try {
    // Asegurar que 'poderes', 'aliados' y 'enemigos' se procesan correctamente
    const poderes = req.body.poderes ? req.body.poderes.split(',').map(p => p.trim()) : [];
    const aliados = req.body.aliados ? req.body.aliados.split(',').map(a => a.trim()) : [];
    const enemigos = req.body.enemigos ? req.body.enemigos.split(',').map(e => e.trim()) : [];

    if (poderes.length === 0) {
      return res.status(400).json({ status: 'error', message: 'Debe proporcionar al menos un poder.' });
    }

    const nuevoSuperheroe = {
      nombreSuperHeroe: req.body.nombreSuperHeroe.trim(),
      nombreReal: req.body.nombreReal.trim(),
      edad: parseInt(req.body.edad, 10),
      planetaOrigen: req.body.planetaOrigen.trim(),
      debilidad: req.body.debilidad.trim(),
      poderes,
      aliados,
      enemigos
    };

    // Llamar al servicio para guardar el superhéroe
    const superheroeCreado = await crearSuperheroe(nuevoSuperheroe);
    res.status(201).redirect('/superheroes'); // Redirigir al dashboard tras agregar
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar superhéroe: ' + error.message });
  }
}

//Edita al superheroe seleccionado y renderiza la vista
export async function editarSuperheroeController (req, res){
  try {
    const { id } = req.params;
    const superheroe = await obtenerSuperheroePorID(id); // Asegúrate de que esta función obtiene correctamente el héroe.

    if (!superheroe) {
      return res.status(404).send('Superhéroe no encontrado');
    }

    // Renderizar la vista de edición con los datos del superhéroe
    res.render('editSuperhero', { title: 'Editar de Superhéroes', superheroe });
  } catch (error) {
    console.error('Error al obtener el superhéroe para edición:', error);
    res.status(500).send('Error interno del servidor');
  }
};


//Actualiza al superheroe una vez que se modifican los datos
export async function actualizarSuperheroeEditadoController (req, res){
  try {
    const { id } = req.params;
    const {
      nombreSuperHeroe,
      nombreReal,
      edad,
      planetaOrigen,
      debilidad,
      poderes,
      aliados,
      enemigos,
    } = req.body;

    // Convertir cadenas de texto separadas por comas en arrays
    const poderesArray = poderes.split(',').map(p => p.trim());
    const aliadosArray = aliados.split(',').map(a => a.trim());
    const enemigosArray = enemigos.split(',').map(e => e.trim());

    // Actualizar el superhéroe
    const superheroeActualizado = {
      nombreSuperHeroe,
      nombreReal,
      edad: parseInt(edad, 10), // Convertir edad a número
      planetaOrigen,
      debilidad,
      poderes: poderesArray,
      aliados: aliadosArray,
      enemigos: enemigosArray,
    };

    const resultado = await actualizarSuperheroePorId(id, superheroeActualizado);

    if (!resultado) {
      return res.status(404).send('No se pudo actualizar el superhéroe.');
    }

    // Redirigir al dashboard tras agregar
    res.status(201).redirect('/superheroes'); 
  } catch (error) {
    console.error('Error al actualizar el superhéroe:', error);
    res.status(500).send('Error interno del servidor');
  }
};


//Elimina al superhéroe seleccionado
export async function eliminarSuperheroeController(req, res) {
  try {
    const { id } = req.params;

    const superheroeEliminado = await eliminarSuperheroePorId(id);

    if (!superheroeEliminado) {
      return res.status(404).send('Superhéroe no encontrado o no se pudo eliminar.');
    }

    // Redirigir al dashboard tras la eliminación
    res.redirect('/superheroes');
  } catch (error) {
    console.error('Error al eliminar el superhéroe:', error);
    res.status(500).send('Error interno del servidor');
  }
}





//FUNCIONES SIN VISTAS




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