import * as Joi from 'joi';
export const ENTRENADOR_SCHEMA = Joi
    .object()
    .keys({
        nombres:Joi.string().regex(/^[a-zA-Z ]{4,30}$/).required(),
        apellidos: Joi.string().regex(/^[a-zA-Z ]{4,30}$/).required(),
        fechaNacimiento:Joi.date().required(),
        numeroMedallas:Joi.number().integer().min(0).max(8).required(),
        campeonActual:Joi.boolean().required(),
        usuarioFKIdUsuario: Joi.number().integer().required(),
        img_entrenador:Joi.string()
    });
