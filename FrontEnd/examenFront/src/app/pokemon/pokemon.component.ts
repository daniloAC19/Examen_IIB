import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {PokemonService} from "../servicios/pokemon.service";
import {TransferenciaService} from "../servicios/transferencia.service";
import {UsuarioService} from "../servicios/usuario.service";
import {UsuarioInterface} from "../interfaces/usuario.interface";
import {EntrenadorService} from "../servicios/entrenador.service";
import {EntrenadorInterface} from "../interfaces/entrenador.interface";

@Component({
  selector: 'app-medicamento',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  @Input() imagen: string;
  @Input() nombre: string;
  @Input() pastillas: string;
  @Input() idPokemon:number;
  @Input() idMedicamentoInter:number;
  @Input() estado:boolean = true;
  @Input() estado2:boolean = true;

  idEntrenador1:number
  idEntrenador2:number

  usuarios:Array<UsuarioInterface>
  paciente:Array<EntrenadorInterface>
  paciente2:Array<EntrenadorInterface>

  @Output() selecciono: EventEmitter<string> = new EventEmitter();
  constructor(private _router: Router,
              private transferenciaServicio :TransferenciaService,
              private servicioUser: UsuarioService,
              private servicioPaciente : EntrenadorService
  ) { }

  ngOnInit() {

    if(UsuarioService.userSelect === 0){
      const observableUsuarios$ = this.servicioUser.obtenerUsuarioDadoMedicamento(PokemonService.pokSelecionado);
      observableUsuarios$.subscribe(
        (results:any) => {
          this.usuarios = results;
          UsuarioService.userSelect = this.usuarios[0].id_usuario;
          console.log('adasdsada'+ UsuarioService.userSelect)
        },
      );


    }
    if(UsuarioService.userSelect != 0){
      console.log('no hay usuario')
    }

  }

  pedirTransferencia() {

    console.log('Pidio transferencia de ', this.nombre + ' con id:' + this.idPokemon);
    PokemonService.pokSelecionado = this.idPokemon

    const observablePac$ = this.servicioPaciente.obtenerEntrenador(PokemonService.pokSelecionado);
    observablePac$.subscribe(
      (results:any) => {
        this.paciente = results;
        EntrenadorService.entrenadorSelect1 = this.paciente[0].id_entrenador;
        console.log(this.paciente)
      },
    );


    this.selecciono.emit(this.nombre);
    this._router.navigate(['/seleccion']);
  }

  seleccionarTransferencia(){
    console.log('Selecciono ', this.nombre + ' con id:' + this.idMedicamentoInter)
    PokemonService.pokIntercambio = this.idMedicamentoInter;

    const observablePac2$ = this.servicioPaciente.obtenerEntrenador(PokemonService.pokIntercambio);
    observablePac2$.subscribe(
      (results:any) => {
        this.paciente2 = results;
        EntrenadorService.entrenadorSelect2 = this.paciente2[0].id_entrenador;
        this.transferenciaServicio.registrarPeticion(UsuarioService.userLogin,UsuarioService.userSelect,
          PokemonService.pokIntercambio,PokemonService.pokSelecionado,
          EntrenadorService.entrenadorSelect1,EntrenadorService.entrenadorSelect2);
      },
    )
    this.selecciono.emit(this.nombre);

    this._router.navigate(['/perfil']);
  }

}
