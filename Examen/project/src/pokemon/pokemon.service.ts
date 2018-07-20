import {Component, Post} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {PokemonEntity} from "./pokemon.entity";
import {createQueryBuilder, Equal, getRepository, In, Like, Not, Repository} from "typeorm";
import {PokemonData} from "./pokemon.data";
import {EntrenadorEntity} from "../entrenador/entrenador.entity";
import {EntrenadorService} from "../entrenador/entrenador.service";

@Component()
export class PokemonService {

    constructor(
        @InjectRepository(PokemonEntity)
        private readonly pokemonRepository: Repository<PokemonEntity>,
        private  entrenadorService: EntrenadorService

    ){}
    pokemon: Pokemon[] = [];

    //Metodo para crear un pokemon
    crearPokemon(pokemon: Pokemon){
        const pok = new PokemonEntity();

        pok.numeroPokemon = pokemon.numeroPokemon;
        pok.nombrePokemon = pokemon.nombrePokemon;
        pok.poderEspecial1 = pokemon.poderEspecial1;
        pok.poderEspecial2 = pokemon.poderEspecial2;
        pok.fechaCaptura = new Date(pokemon.fechaCaptura);
        pok.nivel = pokemon.nivel;
        pok.entrenadorId = pokemon.entrenadorIdIdEntrenador;
        pok.img_pok = pokemon.img_pok;

        this.pokemonRepository.save(pok);
    }
    //metodo para registrar los pokemon quemados en la app
    crearTodosPokemons(){
        for (var indice in PokemonData){
            const pok = new PokemonEntity();
            pok.numeroPokemon = PokemonData[indice].numeroPokemon;
            pok.nombrePokemon = PokemonData[indice].nombrePokemon;
            pok.poderEspecial1 = PokemonData[indice].poderEspecial1;
            pok.poderEspecial2 = PokemonData[indice].poderEspecial2;
            pok.fechaCaptura = new Date(PokemonData[indice].fechaCaptura);
            pok.nivel = parseInt(PokemonData[indice].nivel);
            pok.entrenadorId = parseInt(PokemonData[indice].entrenadorIdIdEntrenador);
            pok.img_pok = PokemonData[indice].img_pok;

            this.pokemonRepository.save(pok);
        }
    }


    //listar todos los pokemon que no pertenecen a los pacientes de un determinado usuario
    async  listarPokemosEntrenadorUsuario(idUser:number): Promise<PokemonEntity[]>{
        /*let promise = Promise.resolve(this.pacienteService.listarIdsPacienteOtrosUsuarios(1));*/

        const joinExample = await this.pokemonRepository.createQueryBuilder("pokemon")
            .innerJoin("pokemon.entrenadorId", "pok") //representa a la entidad entrenador
            .innerJoin("pok.pokemonId", "pokEnt") //representa a la entidad pokemon
            .where( "pok.usuarioFK != :id")
            .setParameter("id", idUser)
            .getMany();
        //console.log(joinExample)
        return (joinExample);
    }


    //listar todos los pokemon que no pertenecen a los pacientes de un determinado usuario con busqueda con Like
    async  busquedaLike(name:string,idUser:number): Promise<PokemonEntity[]>{

        const joinMedicamentoPaciente = await this.pokemonRepository.createQueryBuilder("pokemon")
            .innerJoin("pokemon.entrenadorId", "ent") //representa a la entidad entrenador
            .innerJoin("ent.entrenadorId", "ent") //representa a la entidad pokemon
            .where("ent.usuarioFK != :id",{id:idUser})
            .andWhere("pokemon.nombrePokemon like :names", {names: '%' +  name + '%' })
            .getMany();
        //console.log(joinMedicamentoPaciente)
        /*var data = await  getRepository(PokemonEntity)
            .createQueryBuilder("med")
            .where("med.nombrePokemon like :names", {names: '%' +  name + '%' })
            .getMany();*/

        return (joinMedicamentoPaciente);
    }

    //Metodo para buscar el/los pokemon por un determinado entrenador
    async buscarPokEnt(id: number): Promise<PokemonEntity[]> {
        return (await this.pokemonRepository.find({entrenadorId:Equal(id)}));
    }

    //Metodo para buscar el/los pokemon del usuario logeado
    async  listarPokemonUsuario(idUser:number): Promise<PokemonEntity[]>{
        const joinExample = await this.pokemonRepository.createQueryBuilder("pokemon")
            .innerJoin("pokemon.entrenadorId", "pok") //representa a la entidad entrenador
            .innerJoin("pok.pokemonId", "pokEnt") //representa a la entidad pokemon
            .where( "pok.usuarioFK = :id")
            .setParameter("id", idUser)
            .getMany();
        return (joinExample);
    }

    //Metodo obtener un pokemon
    async obtenerUno(idPok:number): Promise<PokemonEntity[]>{
        return (await this.pokemonRepository.find({id_pokemon:Equal(idPok)}))
    }

    //Actualizar el entrenador de un pokemon
    async updatePaciente(idMed:number, idEntrenador:number): Promise<string>{
        await this.pokemonRepository.createQueryBuilder()
            .update("pokemon")
            .set({entrenadorId:idEntrenador})
            .where("id_Entrenador = :id",{id: idMed})
            .execute()

        return 'Realizado con exito'
    }
}


export class Pokemon {
    constructor(
        public numeroPokemon:number,
        public nombrePokemon:string,
        public poderEspecial1:string,
        public poderEspecial2:string,
        public fechaCaptura:string,
        public nivel:number,
        public entrenadorIdIdEntrenador:number,
        public img_pok:string
    ){};
}