import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {PokemonEntity} from "../pokemon/pokemon.entity";

@Entity('entrenador')
export class EntrenadorEntity {

    @PrimaryGeneratedColumn()
    id_entrenador: number;
    @Column()
    nombres: string;
    @Column()
    apellidos: string;
    @Column()
    fechaNacimiento: Date;
    @Column()
    numeroMedallas: number;
    @Column()
    campeonActual: boolean;
    @Column()
    img_entrenador: string;

    @ManyToOne(
        type => UsuarioEntity,
        entrenadorEntity => entrenadorEntity.entrenadorId)
    usuarioFK: number;

    @OneToMany(
        type => PokemonEntity,
        entrenadorEntity => entrenadorEntity.entrenadorId)
    pokemonId: number;

}