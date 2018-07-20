import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable()
export class PokemonService {

  public static pokSelecionado: number;
  public static pokIntercambio: number;

  constructor(private consulta: HttpClient) {
  }

  //obtener todos los pokemon que no pertenecen a los pacientes de un determinado usuario
  obtenerAllMedicamentos(iduser:number){
    return this.consulta.get("http://localhost:3000/Pokemon/mostrarPokemons/"+iduser);
  }

  //busqueda con el operador Like de el o los pokemon que no pertenecen a los pacientes de un determinado usuario
  obtenerMedicamentosbusqueda(busqueda:string, idUser:number){
    return this.consulta.get('http://localhost:3000/Pokemon/busquedaPokemons/'+busqueda+'&'+idUser);
  }

  //busqueda de el/los pokemon de un determinado entrenador
  obtenerMedicamentoPaciente(idPac:number){
    return this.consulta.get('http://localhost:3000/Pokemon/listarPokemons/entrenador/'+idPac);
  }

  //busqueda de el/los pokemon del usuario logeado
  obtenerMedicamentoUsuario(idUser:number){
    return this.consulta.get('http://localhost:3000/Pokemon/listarPokemon/usuario/'+idUser);
  }

  //obtener un determinado pokemon en base a su id
  obtenerMedicamentoId(idMed:number){
    return this.consulta.get('http://localhost:3000/Pokemon/pokemon/'+idMed)
  }

  //actualizar el entrenador al que pertenece un pokemon
  updatePaciente(idMed:number, idPac:number){
    let headers  = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    let body = new HttpParams();

    body = body.set('idMed', idMed.toString());
    body = body.set('idPac', idPac.toString());

    return this.consulta.post('http://localhost:3000/Pokemon/update/', body,{headers: headers}).subscribe();

  }

}
