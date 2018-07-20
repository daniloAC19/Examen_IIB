import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UsuarioService} from "../servicios/usuario.service";
import {EntrenadorService} from "../servicios/entrenador.service";
import {PokemonService} from "../servicios/pokemon.service";
import {UsuarioInterface} from "../interfaces/usuario.interface";
import {EntrenadorInterface} from "../interfaces/entrenador.interface";
import {PokemonInterface} from "../interfaces/pokemon.interface";
import {PeticionComponent} from "../peticion/peticion.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuarios:Array<UsuarioInterface>
  usuarioAux:Array<UsuarioInterface>

  pacientes:Array<EntrenadorInterface>
  pacientesAux:Array<EntrenadorInterface>

  medicamentos: Array<PokemonInterface>
  medicamentosAux: Array<PokemonInterface>

  userLike = '';
  estado :boolean =false;

  @Input() counter:number = 0;
  @Input() counter2:number = 0;
  @Input() counter3:number = 0;


  constructor(private _httpClient: HttpClient,
              private servicioUser: UsuarioService,
              private servicioPaciente: EntrenadorService,
              private servicioMed: PokemonService
  ) {}

  ngOnInit() {

    this.usuarios = [];
    this.pacientes = [];
    PeticionComponent.idEnt = 0;
    UsuarioService.userSelect = 0;

    if(this.estado == false){
      console.log('estado igual falso')
    }
    else{
      if (this.userLike.length === 0) {
        this.obtenerUsuarios();
        this.obtenerPacientes();
        this.obtenerMedicamentos()

      }
      else{
        //busqueda mediante like para usuarios
        const observableUsuariosLike$ = this.servicioUser.obtenerUserbusqueda(this.userLike, UsuarioService.userLogin);
        observableUsuariosLike$.subscribe(
          (results:any)=>{
            this.usuarios = results;
            if(this.usuarios.length ===  0){
              this.obtenerUsuarios()
            }
            else{
              this.usuarios = results;
              this.usuarioAux = results;
            }
          }
        );

        //busqueda mediante like para pacientes
        const observablePacLike$ = this.servicioPaciente.obtenerEntrenadorbusqueda(this.userLike,UsuarioService.userLogin);
        observablePacLike$.subscribe(
          (results:any)=>{
            this.pacientes = results;
            if(this.pacientes.length === undefined){
              this.obtenerPacientes()
            }else{
              this.pacientes = results;
              this.pacientesAux= results;
            }
          }
        );


        //busqueda mediante like para pokemon
        const observableMedLike$ = this.servicioMed.obtenerMedicamentosbusqueda(this.userLike,UsuarioService.userLogin);
        observableMedLike$.subscribe(
          (results:any)=>{
            this.medicamentos = results;
            if(this.medicamentos.length === undefined){
             this.obtenerMedicamentos()
            }else{
              this.medicamentos = results;
              this.medicamentosAux=results;
            }
          }
        );

      }
    }
  }

  capturarInformacion(){
    this.estado = true;
    this.ngOnInit();
  }

  /*Metodos para obtener usuarios, pacientes y pokemon de la base de datos*/
  obtenerUsuarios(){
    const observableUsuariosLike$ = this.servicioUser.obtenerAllUser(UsuarioService.userLogin);
    observableUsuariosLike$.subscribe(
      (results:any)=>{
        this.usuarios = results;
        this.usuarioAux = results;
      });
  }

  obtenerPacientes(){
    const observablePacLike$ = this.servicioPaciente.obtenerAllEntrenadores(UsuarioService.userLogin);
    observablePacLike$.subscribe(
      (results:any)=>{
        this.pacientes = results;
        this.pacientesAux= results;
      });
  }

  obtenerMedicamentos(){
    const observableMedicamentos$ = this.servicioMed.obtenerAllMedicamentos(UsuarioService.userLogin);
    observableMedicamentos$.subscribe(
      (results:any) => {
        this.medicamentos = results;
        this.medicamentosAux=results;
      },
    );
  }

  /*Metodos para poder mostrar los 4 siguientes y 4 anteriores  usuarios*/
  aumentarContador(){
    this.counter = this.counter + 1;
    this.usuarioAux = this.usuarios.slice(this.counter*4, this.usuarios.length);
  }
  disminuirContador(){
    this.counter = this.counter - 1;
    this.usuarioAux = this.usuarios.slice(this.counter*4, this.usuarios.length);
  }

  /*Metodos para poder mostrar los 2 siguientes y 2 anteriores  pacientes*/
  aumentarContador1(){
    this.counter2 = this.counter2 + 1;
    this.pacientesAux = this.pacientes.slice(this.counter2*2, this.pacientes.length);
  }
  disminuirContador1(){
    this.counter2 = this.counter2 - 1;
    this.pacientesAux = this.pacientes.slice(this.counter2*2, this.pacientes.length);
  }

  /*Metodos para poder mostrar los 4 siguientes y 4 anteriores  pokemon*/
  aumentarContador2(){
    this.counter3 = this.counter3 + 1;
    this.medicamentosAux = this.medicamentos.slice(this.counter3*4, this.medicamentos.length);
  }
  disminuirContador2(){
    this.counter3 = this.counter3 - 1;
    this.medicamentosAux = this.medicamentos.slice(this.counter3*4, this.medicamentos.length);
  }

}
