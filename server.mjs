import express from 'express';
console.log("express importado");
import path from 'path';
console.log("path importado");
import { fileURLToPath } from 'url';
console.log("url importado");
import superheroesRoutes from './routes/superheroesRoutes.js';
console.log("rutas superheroes importadas");
import otherRoutes from './routes/otherRoutes.js';
console.log("otras rutas importadas");
import './dbConfig.js'; // Conexión a la base de datos
console.log("base de datos conectada importadas");
import methodOverride from 'method-override';
console.log("método override importado");
import expressLayouts from 'express-ejs-layouts';
console.log("express layouts importados");

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

app.use(expressLayouts);
app.set('layout', 'layout'); //Archivo base de layout


// Rutas para las vistas
app.use('/', otherRoutes);
app.use('/superheroes', superheroesRoutes);


// Configurar carpeta de archivos estáticos
app.use(express.static(path.resolve('./public')));


// Servidor
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));

export default app;