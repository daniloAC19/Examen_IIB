import {Component, Input, OnInit} from '@angular/core';
import {PokemonService} from "../servicios/pokemon.service";
import {PokemonInterface} from "../interfaces/pokemon.interface";

@Component({
  selector: 'app-peticion-espera',
  templateUrl: './peticion-espera.component.html',
  styleUrls: ['./peticion-espera.component.css']
})
export class PeticionEsperaComponent implements OnInit {

  @Input() nombreUser:string;
  @Input() imagenUser:string;

  //Item1
  @Input() idSeleccionado:number =0;
  nombreItem1='';
  imagenItem1='';
  MedicamentosItem1: PokemonInterface

  //item2
  @Input() idSeleccionado2:number =0;
  nombreItem2='';
  imagenItem2='';
  MedicamentosItem2: PokemonInterface

  constructor(
    private medicamentoService: PokemonService,
  ) { }

  ngOnInit() {
    if (this.idSeleccionado != 0 && this.idSeleccionado2 !=0){
      const observable1$ = this.medicamentoService.obtenerMedicamentoId(this.idSeleccionado);
      observable1$.subscribe(
        (result:any)=>{
          this.MedicamentosItem1 = result;
          this.nombreItem1 = this.MedicamentosItem1[0].nombrePokemon
          this.imagenItem1 = this.MedicamentosItem1[0].img_pok
        }
      );

      const observable2$ = this.medicamentoService.obtenerMedicamentoId(this.idSeleccionado2);
      observable2$.subscribe(
        (result:any)=>{
          this.MedicamentosItem2 = result;
          this.nombreItem2 = this.MedicamentosItem2[0].nombrePokemon
          this.imagenItem2 = this.MedicamentosItem2[0].img_pok
        }
      );

    }
  }

}
