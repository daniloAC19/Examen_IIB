import * as Joi from 'joi';
export const POKEMON_SCHEMA = Joi
    .object()
    .keys({
        numeroPokemon:Joi.number().precision(2).required(),
        nombrePokemon: Joi.string().regex(/^[a-zA-Z.,' ' ]{4,30}$/).required(),
        poderEspecial1:Joi.string().regex(/^[a-zA-Z0-9 ]{4,30}$/).required(),
        poderEspecial2:Joi.string().regex(/^[a-zA-Z,.' ' ]{4,50}$/).required(),
        fechaCaptura:Joi.date().required(),
        nivel:Joi.number().integer().required(),
        entrenadorIdIdEntrenador:Joi.number().integer().required(),
        img_pok:Joi.string()
    });