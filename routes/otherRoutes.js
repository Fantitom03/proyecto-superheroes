import express from 'express';

const router = express.Router();

router.get('/', (req, res) => res.render('index', {title: 'Página Principal'}));
router.get('/contact', (req, res) => {res.render('contact', { title: 'Contacto' });});
router.post('/contact', (req, res) => res.redirect('/superheroes')); // Redirigir al dashboard tras agregar
router.get('/about', (req, res) => {res.render('about', { title: 'Acerca de Nosotros' });});


export default router;