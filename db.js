import mongoose from 'mongoose';

mongoose
  .connect('mongodb+srv://Grupo-05:grupo05@cursadanodejs.ls9ii.mongodb.net/Node-js', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Tiempo en milisegundos (30 segundos)
  })
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch((error) => console.error('Error al conectar a MongoDB: ', error));