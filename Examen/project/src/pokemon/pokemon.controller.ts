import {Body, Controller, Get, HttpStatus, Param, Post, Put, Req, Res} from "@nestjs/common";
import {Pokemon, PokemonService} from "./pokemon.service";
import {PokemonPipe} from "../pipes/pokemon.pipe";
import {POKEMON_SCHEMA} from "./pokemon.schema";

@Controller('Pokemon')
export class PokemonController {

    constructor(private  pokemonService: PokemonService){

    }

    //Body params - registrar un pokemon en la app
    @Post('registrarPokemon')
    crearPokemon(@Body(new PokemonPipe(POKEMON_SCHEMA)) bodyParams, @Res () response){
        const pokemon1 = new  Pokemon(
            bodyParams.numeroPokemon,
            bodyParams.nombrePokemon,
            bodyParams.poderEspecial1,
            bodyParams.poderEspecial2,
            bodyParams.fechaCaptura,
            bodyParams.nivel,
            bodyParams.entrenadorIdIdEntrenador,
            bodyParams.img_pok,
        );

        this.pokemonService.crearPokemon(pokemon1);
        return response.send('Pokemon Registrado');

    }

    //registrar los pokemon quemados en la app
    @Get('crearPokemon')
    registrarAllPokemons(@Res () response, @Req () request){
        this.pokemonService.crearTodosPokemons()
        return response.status(202).send('Pokemon Creados');
    }

    //listar todos los pokemon que no pertenecen a los pacientes de un determinado usuario
    @Get('mostrarPokemons/:idUser')
    listarTodosLosPokemons(@Res () response, @Req () request, @Param() params){
        var promise = Promise.resolve(this.pokemonService.listarPokemosEntrenadorUsuario(params.idUser))

        promise.then(function (value) {
            if(value.length === 0){
                return response.send({
                    mensaje:'No existe ningun entrenador',
                    estado: HttpStatus.NOT_FOUND + ' Not found',
                });
            }
            else{
                return response.status(202).send(value);
            }
        });
    }

    //busqueda con el operador Like de el o los pokemon que no pertenecen a los pacientes de un determinado usuario
    @Get('busquedaPokemons/:name&:id')
    mostrarPokLike(@Res () response, @Req () request, @Param() params){

        var promise = this.pokemonService.busquedaLike(params.name,params.id);
        promise.then(function (value) {
            if(value.length === 0){
                return response.send({
                    mensaje:'No se encontro el usuario',
                    estado: HttpStatus.NOT_FOUND + ' Not found',
                });
            }else{
                return response.status(202).send(value);
            }
        });
    }

    //busqueda de el/los pokemon de un determinado entrenador
    @Get('listarPokemons/entrenador/:id')
    mostrarPokemonEntrenador(@Res () response, @Req () request, @Param() params){
        var promise = this.pokemonService.buscarPokEnt(params.id);
        promise.then(function (value) {
            if(value.length === 0){
                return response.send({
                    mensaje:'No se encontro el pokemon',
                    estado: HttpStatus.NOT_FOUND + ' Not found',
                });
            }else{
                return response.status(202).send(value);
            }
        });
    }

    //busqueda de el/los pokemon del usuario logeado
    @Get('listarPokemon/usuario/:id')
    mostrarPokemonUsuario(@Res () response, @Req () request, @Param() params){
        var promise = this.pokemonService.listarPokemonUsuario(params.id);
        promise.then(function (value) {
            if(value.length === 0){
                return response.send({
                    mensaje:'No se encontro el pokemon',
                    estado: HttpStatus.NOT_FOUND + ' Not found',
                });
            }else{
                return response.status(202).send(value);
            }
        });
    }

    //busqueda de un determinado pokemon.
    @Get('pokemon/:id')
    obtenerPokemonId(@Res () response, @Req () request, @Param() params){
        var promise = this.pokemonService.obtenerUno(params.id);
        promise.then(function (value) {
            if(value.length === 0){
                return response.send({
                    mensaje:'No se encontro el pokemon',
                    estado: HttpStatus.NOT_FOUND + ' Not found',
                });
            }else{
                return response.status(202).send(value);
            }
        });
    }

    @Post('update/')
    updatePokemon(@Res () response, @Req () request, @Body() bodyParams){

        this.pokemonService.updatePaciente(bodyParams.idMed, bodyParams.idPac);
        return response.send('Peticion de transferencia Registrada');
    }
}