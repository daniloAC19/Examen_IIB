import {Component} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Equal, Like, Not, Repository} from "typeorm";
import {EntrenadorEntity} from "./entrenador.entity";
import {UsuarioData} from "../usuario/usuario.data";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {EntrenadorData} from "./entrenador.data";
import {PokemonEntity} from "../pokemon/pokemon.entity";

@Component()

export class EntrenadorService {

    constructor(
        @InjectRepository(EntrenadorEntity)
        private readonly entrenadorRepository: Repository<EntrenadorEntity>
    ){}
    entrenador: Entrenador[] = [];

    //Metodo Crear pacientes
    crearEntrenador(entrenador: Entrenador){

        const ent = new EntrenadorEntity();
        ent.nombres = entrenador.nombres;
        ent.apellidos = entrenador.apellidos;
        const fecha = new Date(entrenador.fechaNacimiento);
        ent.fechaNacimiento = fecha;
        ent.numeroMedallas = entrenador.numeroMedallas;
        ent.campeonActual = entrenador.campeonActual;
        ent.usuarioFK = entrenador.usuarioFKIdUsuario;
        ent.img_entrenador = entrenador.img_entrenador;

        this.entrenadorRepository.save(ent);
    }

    crearTodosEntrenadores(){

        for (var indice in EntrenadorData){
            const entrenador = new EntrenadorEntity();

            entrenador.nombres = EntrenadorData[indice].nombres;
            entrenador.apellidos = EntrenadorData[indice].apellidos;
            entrenador.fechaNacimiento = new Date(EntrenadorData[indice].fechaNacimiento);
            entrenador.numeroMedallas = EntrenadorData[indice].numeroMedallas;
            entrenador.campeonActual = EntrenadorData[indice].campeonActual;
            entrenador.usuarioFK = parseInt(EntrenadorData[indice].usuarioFKIdUsuario);
            entrenador.img_entrenador = EntrenadorData[indice].img_entrenador;

            this.entrenadorRepository.save(entrenador);
        }
    }

    //Metodo Listar Todos los entrenador, menos los pacientes de un determinado usuario
    async listarEntrenadoresOtrosUsuarios(id:number): Promise<EntrenadorEntity[]>{
        return (await this.entrenadorRepository.find({
            where:{usuarioFK:Not(Equal(id))}
        }));
    }

    //Metodo Listar Todos los Id de los pacientes, menos los pacientes de un determinado usuario
    async listarIdEntrenadorOtrosUsuarios(id:number): Promise<EntrenadorEntity[]>{
        return (await this.entrenadorRepository.find({
            select:["id_entrenador"],
            where:{usuarioFK:Equal(id)}
        }));
    }

    //Obtener un determinado entrenador
    async obtenerEntrenadorPorId(idPac:number): Promise<EntrenadorEntity[]>{
        return (await this.entrenadorRepository.find({
            id_entrenador:Equal(idPac)}));
    }


    //Obtener un entrenador dado pokemon
    async obtenerEntrenadorPorPok(idPok:number): Promise<EntrenadorEntity[]>{
        const joinExample = await this.entrenadorRepository.createQueryBuilder('ent')
            .innerJoin("ent.pokemonId","pok")
            .where("pok.id_pokemon = :id")
            .setParameter("id", idPok)
            .getMany()
        console.log(joinExample)
        return (joinExample);
    }

    //obtener pacientes mediante el operador like y que no sean de un determinado usuario
    async buscarEntrenadorLike(name: string, id:number): Promise<EntrenadorEntity[]> {
        //console.log(await this.pacienteRepository.find({nombres:Like('%'+name+'%')}));
        return (await this.entrenadorRepository.find({
            nombres:Like('%'+name+'%'), usuarioFK:Not(Equal(id))
        }));
    }

    //Metodo pacientes de un determinado usuario
    async obtenerEntrenadorPorUsuario(idUser:number): Promise<EntrenadorEntity[]>{
        return (await this.entrenadorRepository.find({usuarioFK:Equal(idUser)}));
    }

    //Metodo Listar Todos los entrenador
    async findAll(): Promise<EntrenadorEntity[]>{
        //console.log(await this.pacienteRepository.find());
        return (await this.entrenadorRepository.find());
    }
}


export class Entrenador {
    constructor(
        public nombres:string,
        public apellidos:string,
        public fechaNacimiento:string,
        public numeroMedallas:number,
        public campeonActual:boolean,
        public img_entrenador:string,
        public usuarioFKIdUsuario:number,
    ){};
}