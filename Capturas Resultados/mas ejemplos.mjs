//Obtener superheroes Aliados con otro Superheroe

//En el service
export function obtenerAliadosDeSuperheroe(nombreSuperheroe) {
    const superheroes = repository.obtenerTodos();
    return superheroes.filter(hero => hero.aliado.includes(nombreSuperheroe));
}

//En el controller
export function obtenerAliadosDeSuperheroeController(req, res) {
    const { nombreSuperheroe } = req.params;
    const aliados = obtenerAliadosDeSuperheroe(nombreSuperheroe);

    if (aliados.length > 0) {
        res.send(renderizarListaSuperheroes(aliados));
    } else {
        res.status(404).send({ mensaje: "No se encontraron aliados para este superhéroe" });
    }
}

//En el servidor
app.get('/superheroes/aliados/:nombreSuperheroe', obtenerAliadosDeSuperheroeController);



//Obtener superheroes menores de 18 años

//En el service

export function obtenerSuperheroesMenoresDe18() {
    const superheroes = repository.obtenerTodos();
    return superheroes.filter(hero => hero.edad < 18);
}

//En el controller
export function obtenerSuperheroesMenoresDe18Controller(req, res) {
    const superheroes = obtenerSuperheroesMenoresDe18();
    res.send(renderizarListaSuperheroes(superheroes));
}

//En el server
app.get('/superheroes/edad/menorA18', obtenerSuperheroesMenoresDe18Controller);
