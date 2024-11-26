import { body } from 'express-validator';

export const superheroValidationRules = () => [
    body('nombreSuperHeroe')
        .notEmpty().withMessage('El nombre del superhéroe es obligatorio.')
        .trim().withMessage('El nombre del superhéroe no debe tener espacios al inicio o al final.')
        .isLength({ min: 3, max: 60 }).withMessage('El nombre del superhéroe debe tener entre 3 y 60 caracteres.'),
    body('nombreReal')
        .notEmpty().withMessage('El nombre real es obligatorio.')
        .trim().withMessage('El nombre real no debe tener espacios al inicio o al final.')
        .isLength({ min: 3, max: 60 }).withMessage('El nombre real debe tener entre 3 y 60 caracteres.'),
    body('edad')
        .notEmpty().withMessage('La edad es obligatoria.')
        .isInt({ min: 0 }).withMessage('La edad debe ser un número entero mayor o igual a 0.')
        .toInt(), // Asegura que el valor sea numérico.
    body('poderes')
        .notEmpty().withMessage('Debe proporcionar al menos un poder.')
        .custom(value => {
          if (typeof value !== 'string') {
            throw new Error('Debe ser una cadena de texto separada por comas.');
          }
          const poderes = value.split(',').map(p => p.trim());
          if (!poderes.every(p => p.length > 0)) {
            throw new Error('Cada poder debe tener texto válido.');
          }
          if (poderes.length < 3) {
            throw new Error('Debe proporcionar al menos 3 poderes.');
          }
          return true;
        }),
];