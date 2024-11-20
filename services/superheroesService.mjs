import SuperHeroRepository from "../repository/superheroesRepository.mjs";

export async function obtenerSuperheroePorID(id) {
    try {
        const superheroe = await SuperHeroRepository.obtenerPorId(id);
        if (!superheroe) {
            throw new Error("Superhéroe no encontrado");
        }
        return superheroe;
    } catch (error) {
        throw new Error(`Error en obtenerSuperheroePorID: ${error.message}`);
    }
}

export async function obtenerTodosLosSuperheroes() {
    try {
        return await SuperHeroRepository.obtenerTodos();
    } catch (error) {
        throw new Error(`Error en obtenerTodosLosSuperheroes: ${error.message}`);
    }
}

export async function buscarSuperheroesPorAtributo(atributo, valor) {
    try {
        return await SuperHeroRepository.buscarPorAtributo(atributo, valor);
    } catch (error) {
        throw new Error(
            `Error en buscarSuperheroesPorAtributo: ${error.message}`
        );
    }
}

export async function obtenerSuperheroesMayoresDe30() {
    try {
        return await SuperHeroRepository.obtenerMayoresDe30();
    } catch (error) {
        throw new Error(
            `Error en obtenerSuperheroesMayoresDe30: ${error.message}`
        );
    }
}

export async function crearSuperheroe(data) {
    try {
        return await SuperHeroRepository.insertarUno(data);
    } catch (error) {
        throw new Error(
            `Error al crear un superheroe: ${error.message}`
        );
    }
}

export async function actualizarSuperheroePorId(id, data) {
    try {
        return await SuperHeroRepository.actualizarUnoPorId(id, data);
    } catch (error) {
        throw new Error(
            `Error al actualizar al superheroe: ${error.message}`
        );
    }
}

export async function eliminarSuperheroePorId(id) {
    try {
        return await SuperHeroRepository.eliminarUnoPorId(id);
    } catch (error) {
        throw new Error(
            `Error al eliminar al superheroe: ${error.message}`
        );
    }
}

export async function eliminarSuperheroePorNombre(nombre) {
    try {
        return await SuperHeroRepository.eliminarUnoPorFiltro({ nombreSuperHeroe: nombre });
    } catch (error) {
        throw new Error(
            `Error al eliminar al superheroe "${nombre}": ${error.message}`
        );
    }
}
