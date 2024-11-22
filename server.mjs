import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import superheroesRoutes from './routes/superheroesRoutes.js';
import './dbConfig.js'; // Conexión a la base de datos
import methodOverride from 'method-override';

const app = express();
const PORT = 3000;

// Configurar `__dirname` en entorno ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar directorio de vistas y motor EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Rutas para las vistas
app.get('/', (req, res) => res.render('index'));
app.use('/superheroes', superheroesRoutes);

// Configurar carpeta de archivos estáticos
app.use(express.static('public'));


// Servidor
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));

export default app;