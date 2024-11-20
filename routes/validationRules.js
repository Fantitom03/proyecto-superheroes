import { body } from 'express-validator';

export const superheroValidationRules = () => [
    body('nombreSuperHeroe')
        .notEmpty().withMessage('El nombre del superhéroe es obligatorio')
        .isString().withMessage('El nombre del superhéroe debe ser un texto')
        .trim().escape(),
    body('nombreReal')
        .notEmpty().withMessage('El nombre real es obligatorio')
        .isString().withMessage('El nombre real debe ser un texto')
        .trim().escape(),
    body('edad')
        .optional()
        .isInt({ min: 0 }).withMessage('La edad debe ser un número mayor o igual a 0'),
    body('planetaOrigen')
        .optional()
        .isString().withMessage('El planeta de origen debe ser un texto')
        .trim().escape(),
    body('poderes')
        .isArray().withMessage('Los poderes deben ser una lista de texto')
        .optional(),
    body('aliados')
        .optional()
        .isArray().withMessage('Los aliados deben ser una lista de texto'),
    body('enemigos')
        .optional()
        .isArray().withMessage('Los enemigos deben ser una lista de texto')
];