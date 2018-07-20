import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {EntrenadorEntity} from "../entrenador/entrenador.entity";

@Entity('usuario')
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    id_usuario: number;
    @Column()
    nombre_usuario: string;
    @Column()
    password_usuario: string;
    @Column()
    img_usuario: string;

    @OneToMany(
        type => EntrenadorEntity,
        usuarioEntity => usuarioEntity.usuarioFK)
    entrenadorId: number;


}