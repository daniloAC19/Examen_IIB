import {Body, Controller, Get, HttpStatus, Param, Post, Put, Req, Res} from "@nestjs/common";
import {EntrenadorService,Entrenador} from "./entrenador.service";
import {EntrenadorPipe} from "../pipes/entrenador-pipe.service";
import {ENTRENADOR_SCHEMA} from "./entrenador.schema";


@Controller('Entrenador')
export  class EntrenadorController {

    constructor(private  entrenadorservice: EntrenadorService){

    }

    //registarr un entrenador en la base de datos - Body params
    @Post('registrar') //uso pipe
    crearEntrenador(@Body(new EntrenadorPipe(ENTRENADOR_SCHEMA)) bodyParams, @Res () response) {
            const entrenador1 = new Entrenador(
                bodyParams.nombres,
                bodyParams.apellidos,
                bodyParams.fechaNacimiento,
                bodyParams.numeroMedallas,
                bodyParams.campeonActual,
                bodyParams.usuarioFKIdUsuario,
                bodyParams.img,
            );
            this.entrenadorservice.crearEntrenador(entrenador1);

            return response.send('Entrenador Registrado');
    }

    //registrar pacientes quemados en la base de datos
    @Get('crearEntrenador')
    registrarAllEntrenadores(@Res () response, @Req () request){
        this.entrenadorservice.crearTodosEntrenadores()
        return response.status(202).send('Entrenadores Creados');
    }

    //listar todos los pacientes que no pertenecen a un determinado usuario
    @Get('listarEntrenadores/:id')
    listarEntrenadoresOtrosUsuarios(@Res () response, @Req () request, @Param() params){
        var promise = Promise.resolve(this.entrenadorservice.listarEntrenadoresOtrosUsuarios(params.id));
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

    //Filtrar pacientes mediante el operador Like que no pertenecen a un determinado usuario
    @Get('filtrarEntrenador/:name&:id')
    mostrarEntrenadorLike(@Res () response, @Req () request, @Param() params){

        var promise = this.entrenadorservice.buscarEntrenadorLike(params.name, params.id);
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

    //obtener un determinado entrenador en base a su id
    @Get('obtenerEntrenador/:id')
    mostrarEntrenador(@Res () response, @Req () request, @Param() params){

        var promise = this.entrenadorservice.obtenerEntrenadorPorId(params.id);
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


    //obtener los pacientes de un determinado usuario
    @Get('obtenerEntrenadorPorUsuario/:id')
    mostrarEntrenadorPorUsuario(@Res () response, @Req () request, @Param() params){

        var promise = this.entrenadorservice.obtenerEntrenadorPorUsuario(params.id);
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


    //listar todos los pacientes de la base de datos
    @Get('listarEntrenador')
    listarTodosLosEntrenadores(@Res () response, @Req () request){
        var promise = Promise.resolve(this.entrenadorservice.findAll());
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

    //obtener entrenador dado pokemon
    @Get('idPokemon/:id')
    obtenerEntrenamientoDadoPok(@Res () response, @Req () request, @Param() params){
        var promise = Promise.resolve(this.entrenadorservice.obtenerEntrenadorPorPok(params.id));
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
}

