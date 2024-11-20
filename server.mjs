import express from 'express';
import superheroesRoutes from './routes/superheroesRoutes.js';
import './db.js'; // Conexión a la base de datos

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Rutas
app.use('/superheroes', superheroesRoutes);

// Servidor
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));