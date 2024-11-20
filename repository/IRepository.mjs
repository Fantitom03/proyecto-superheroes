export default class IRepository {
    obtenerPorId(id) {
        throw new Error("Método 'obtenerPorId()' no implementado");
    }

    obtenerTodos(){
        throw new Error ("Método 'obtenerTodos()' no implementado");
    }

    buscarPorAtributo(atributo, valor) {
        throw new Error ("Método 'buscarPorAtributo()' no implementado");
    }

    obtenerMayoresDe30() {
        throw new Error ("Método 'obtenerMayoresDe30()' no implementado");
    }

    insertarUno(data) {
        throw new Error('Método no implementado.');
    }
    
    actualizarUnoPorId(id, data) {
        throw new Error('Método no implementado.');
    }
    
    eliminarUnoPorId(id) {
        throw new Error('Método no implementado.');
    }
    
    eliminarUnoPorFiltro(filtro) {
        throw new Error('Método no implementado.');
    }
    
}