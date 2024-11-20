import SuperHero from "../models/SuperHero.mjs";
import IRepository from "./IRepository.mjs";

class SuperHeroRepository extends IRepository {
    
    async obtenerPorId(id) {
        try {
            // Busca un superhéroe por ID en la base de datos
            return await SuperHero.findById(id);
        } catch (error) {
            console.error("Error al obtener el superhéroe por ID:", error);
            throw error;
        }
    }

    async obtenerTodos() {
        return await SuperHero.find({});

    }

    async buscarPorAtributo (atributo, valor) {
        const query = { [atributo] : new RegExp(valor, 'i') };
        return await SuperHero.find(query);

    }

    async obtenerMayoresDe30() {
        return await SuperHero.find({
            edad: { $gt: 30 },
            planetaOrigen: 'Tierra',
            $expr: { $gte: [{ $size: "$poderes" }, 2] } // Compara el tamaño del array "poderes" con 2
        });
    }

    async insertarUno(data) {
        const nuevoSuperHeroe = await SuperHero.create(data);
        return nuevoSuperHeroe;
    }
    
    async actualizarUnoPorId(id, data) {
        const superHeroeActualizado = await SuperHero.findByIdAndUpdate(id, data, { new: true });
        return superHeroeActualizado;
    }
    
    async eliminarUnoPorId(id) {
        const superHeroeEliminado = await SuperHero.findByIdAndDelete(id);
        return superHeroeEliminado;
    }
    
    async eliminarUnoPorFiltro(filtro) {
        const superHeroeEliminado = await SuperHero.findOneAndDelete(filtro);
        return superHeroeEliminado;
    }

}

export default new SuperHeroRepository();