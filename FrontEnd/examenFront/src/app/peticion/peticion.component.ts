import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {EntrenadorInterface} from "../interfaces/entrenador.interface";
import {EntrenadorService} from "../servicios/entrenador.service";
import {PokemonService} from "../servicios/pokemon.service";
import {PokemonInterface} from "../interfaces/pokemon.interface";
import {UsuarioService} from "../servicios/usuario.service";
import {UsuarioInterface} from "../interfaces/usuario.interface";

@Component({
  selector: 'app-peticion',
  templateUrl: './peticion.component.html',
  styleUrls: ['./peticion.component.css']
})

export class PeticionComponent implements OnInit{

  public static idEnt: number = 0;
  @Input() counter2:number = 0;
  numeroHijos='';
  estadoContainer=true;
  counter = 1;
  iteraciones = 0;
  estado=true;

  usuarios:Array<UsuarioInterface>
  pacientes:Array<EntrenadorInterface>
  pacientesAux:Array<EntrenadorInterface>
  medicamentos: Array<PokemonInterface>
  medicamentosAux: Array<PokemonInterface>

  constructor(private pacienteService: EntrenadorService,
              private medicamentoService: PokemonService,
              private servicioUser: UsuarioService,
  ) {

  }

  ngOnInit() {

    if(UsuarioService.userSelect === 0 && PeticionComponent.idEnt === 0){
      console.log('no ha elegido ningun entrenador')
    }
    else{
      if(UsuarioService.userSelect != 0){
        this.estadoContainer = false;
        const observableUsuarios$ = this.servicioUser.obtenerUserId(UsuarioService.userSelect);
        observableUsuarios$.subscribe(
          (results:any) => {
            this.usuarios = results;
          },
        );

        const observablePaciente$ = this.pacienteService.obtenerEntrenadoresPorUsuario(UsuarioService.userSelect);
        observablePaciente$.subscribe(
          (results:any)=>{
            this.pacientes = results;
            this.pacientesAux = results;
          }
        )
      }

      if(PeticionComponent.idEnt != 0){
        this.estadoContainer = true;
        const observableUsuarios$ = this.servicioUser.obtenerUserDadoPaciente(PeticionComponent.idEnt);
        observableUsuarios$.subscribe(
          (results:any) => {
            this.usuarios = results;
            UsuarioService.userSelect = this.usuarios[0].id_usuario;
          },
        );

        const observablePaciente$ = this.pacienteService.obtenerEntrenadorid(PeticionComponent.idEnt);
        observablePaciente$.subscribe(
          (results:any)=>{
            this.pacientes = results;
            this.pacientesAux = results
          }
        )

        const observableMed$ = this.medicamentoService.obtenerMedicamentoPaciente(PeticionComponent.idEnt);
        observableMed$.subscribe(
          (results:any) => {
            this.medicamentos = results;
            if(this.medicamentos.length != undefined){
              console.log(this.medicamentos.length)
              if(this.medicamentos.length < 4){
                this.medicamentosAux = this.medicamentos.slice(0,this.medicamentos.length);
                this.estado = false;
              }
              else{
                this.estado = true;
                this.medicamentosAux = this.medicamentos.slice(0,4);
              }
              this.numeroHijos= this.medicamentos.length.toString();
            }
            else{
              this.numeroHijos='No tiene Medicamentos';
            }
          },
        );
      }
    }
  }


  /*Metodos para poder mostrar los 2 siguientes y 2 anteriores  pacientes*/
  aumentarContador1(){
    this.counter2 = this.counter2 + 1;
    this.pacientesAux = this.pacientes.slice(this.counter2, this.pacientes.length);
    PeticionComponent.idEnt = this.pacientes[this.counter2 ].id_entrenador;
  }
  disminuirContador1(){
    this.counter2 = this.counter2 - 1;
    this.pacientesAux = this.pacientes.slice(this.counter2, this.pacientes.length);
    PeticionComponent.idEnt = this.pacientes[this.counter2 ].id_entrenador;
  }

  seleccion(){
    //UsuarioService.userSelect = 0;
    this.estadoContainer = true;
    this.ngOnInit()
  }

  cargarMas(){
    //iteraciones
    this.iteraciones = Math.floor(this.medicamentos.length/4);
    if(this.iteraciones === 1 || this.iteraciones === this.counter){
      this.medicamentosAux = this.medicamentos.slice(0,this.medicamentos.length);
      this.estado = false;
    }
    else{
      this.counter += 1;
      this.medicamentosAux = this.medicamentos.slice(0,this.counter * 4);
      this.estado = true;
    }

  }

}

