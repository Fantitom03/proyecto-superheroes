const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://Grupo-05:grupo05@cursadanodejs.ls9ii.mongodb.net/Node-js', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=> console.log('Conexión exitosa a MongoDB'))
.catch(error => console.error('Error al conectar a MongoDB: ', error));


const superheroSchema = new mongoose.Schema({
    nombreSuperHeroe: { type: String, required: true },
    nombreReal: { type: String, required: true },
    edad: { type: Number, min: 0 },
    planetaOrigen: { type: String, default: 'Desconocido' },
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    createdAt: { type: Date, default: Date.now }
  }, { collection: 'Grupo-05' });


const SuperHero = mongoose.model('SuperHero', superheroSchema);


async function insertSuperHero(){
    const nuevoSuperheroe = new SuperHero({
        nombreSuperHeroe: "Spiderman",
        nombreReal: "Peter Parker",
        edad: 25,
        planetaOrigen: "Tierra",
        debilidad: "Radioactiva",
        poderes: ["Trepar paredes", "Sentido arácnido", "Super fuerza", "Agilidad"],
        aliados: ["Ironman"],
        enemigos: ["Duende Verde"],
        creadoPor: "David Carrizo"
      });
      await nuevoSuperheroe.save();
      console.log('Superheroe insertado: ', nuevoSuperheroe);

}


async function updateSuperHero(nombreSuperHeroe) {
    const result = await SuperHero.updateOne(
        {nombreSuperHeroe : nombreSuperHeroe},
        { $set : {edad : 1081} }
    );

    console.log('Resultado de la actualización: ', result);

}


async function deleteSuperHero(nombreSuperHeroe){
    const result = await SuperHero.deleteOne({nombreSuperHeroe: nombreSuperHeroe});
    console.log('Superhéroe eliminado: ', result);

}


async function findSuperHeroes() {
    const heroes = await SuperHero.find({planetaOrigen:'Tierra'});
    console.log('Superhéroes encontrados: ', heroes);

}


//insertSuperHero();
//updateSuperHero('Thor');
//findSuperHeroes();
//deleteSuperHero('Thor');



