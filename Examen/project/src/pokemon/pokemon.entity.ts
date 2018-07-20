import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {EntrenadorEntity} from "../entrenador/entrenador.entity";

@Entity('pokemon')
export class PokemonEntity {

    @PrimaryGeneratedColumn()
    id_pokemon: number;
    @Column()
    numeroPokemon: number;
    @Column()
    nombrePokemon: string;
    @Column()
    poderEspecial1: string;
    @Column()
    poderEspecial2: string;
    @Column()
    fechaCaptura: Date;
    @Column()
    nivel: number;
    @Column()
    img_pok: string;


    @ManyToOne(
        type => EntrenadorEntity,
        pokemonEntity => pokemonEntity.pokemonId)
    entrenadorId: number;

}
