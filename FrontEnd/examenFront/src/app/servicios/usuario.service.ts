import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {UsuarioInterface} from "../interfaces/usuario.interface";

@Injectable()
export class UsuarioService {

  public static usuarioLogin:UsuarioInterface
  public static userSelect:number=0;
  public static userLogin:number = 0;


  constructor(private consulta: HttpClient) {
  }

  //obtener todos los usuarios a excepcion del usuario logueado
  obtenerAllUser(idUsuario:number){
    return this.consulta.get('http://localhost:3000/Usuario/listarUsuarios/'+idUsuario);
  }

  //buscar un usuario mediante Like
  obtenerUserbusqueda(busqueda:string, idUsuario:number){
    return this.consulta.get('http://localhost:3000/Usuario/filtrarUsuarios/'+busqueda+'&'+idUsuario);
  }

  //obtener un determinado usuario
  obtenerUserId(id:number){
    return this.consulta.get('http://localhost:3000/Usuario/obtenerUsuario/'+id);
  }

  //obtener un determinado usuario dado el id del entrenador
  obtenerUserDadoPaciente(idPac:number){
    return this.consulta.get('http://localhost:3000/Usuario/usuario/'+idPac);
  }

  obtenerUsuarioDadoMedicamento(idMed:number){
    return this.consulta.get('http://localhost:3000/Usuario/usuarioPok/'+idMed);
  }
}
