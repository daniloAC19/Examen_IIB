import { Component, OnInit } from '@angular/core';
import {UsuarioInterface} from "../interfaces/usuario.interface";
import {UsuarioService} from "../servicios/usuario.service";
import {PokemonInterface} from "../interfaces/pokemon.interface";
import {PokemonService} from "../servicios/pokemon.service";
import {PeticionComponent} from "../peticion/peticion.component";

@Component({
  selector: 'app-seleccion',
  templateUrl: './seleccion.component.html',
  styleUrls: ['./seleccion.component.css']
})
export class SeleccionComponent implements OnInit {

  nombreUser:string;
  img_user:string
  numeroHijos='';


  medicamentos: Array<PokemonInterface>
  medicamentosAux: Array<PokemonInterface>
  medicamentosSel: Array<PokemonInterface>

  constructor(
    private medicamentoService: PokemonService,
  ) { }

  ngOnInit() {

    if(UsuarioService.userLogin!=0){
      this.nombreUser = UsuarioService.usuarioLogin[0].nombre_usuario;
      this.img_user = UsuarioService.usuarioLogin[0].img_usuario;

      //console.log('El id del pokemon seleccionado fue: ' + PokemonService.pokSelecionado)
      const observableMedicamento$ = this.medicamentoService.obtenerMedicamentoId(PokemonService.pokSelecionado);
      observableMedicamento$.subscribe(
        (results:any) => {

          if(results  != undefined){
            this.medicamentosSel = results;
          }
          else{
            this.numeroHijos='No tiene Medicamentos';
          }
        },
      );

      const observableMed$ = this.medicamentoService.obtenerMedicamentoUsuario(UsuarioService.userLogin);
      observableMed$.subscribe(
        (results:any) => {
          this.medicamentos = results;
          if(this.medicamentos.length != undefined){
            this.numeroHijos= this.medicamentos.length.toString();
            this.medicamentosAux = results;
          }
          else{
            this.numeroHijos='No tiene Medicamentos';
          }
        },
      );
    }


  }

}
