import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {EntrenadorInterface} from "../interfaces/entrenador.interface";

@Injectable()
export class EntrenadorService{

  public static  entrenadorSelect1 : number =0;
  public static  entrenadorSelect2 : number =0;

  constructor(private consulta: HttpClient) {
  }

  //listar todos los pacientes que no pertenecen a un determinado usuario
  obtenerAllEntrenadores(idUser:number){
    return this.consulta.get('http://localhost:3000/Entrenador/listarEntrenadores/'+idUser);
  }

  //Filtrar pacientes mediante el operador Like que no pertenecen a un determinado usuario
  obtenerEntrenadorbusqueda(busqueda:string, idUser:number){
    return this.consulta.get('http://localhost:3000/Entrenador/filtrarEntrenador/'+busqueda+'&'+idUser);
  }

  //obtener un determinado entrenador en base a su id
  obtenerEntrenadorid(idEnt:number){
    return this.consulta.get('http://localhost:3000/Entrenador/obtenerEntrenador/'+idEnt);
  }

  //obtener pacientes por un determinado usuario
  obtenerEntrenadoresPorUsuario(idUser:number){
    return this.consulta.get('http://localhost:3000/Entrenador/obtenerEntrenadorPorUsuario/'+idUser)
  }

  //obtenerpaciente por el id del pokemon
  obtenerEntrenador(idPok:number){
    return this.consulta.get('http://localhost:3000/Entrenador/idPokemon/'+idPok)
  }

}
