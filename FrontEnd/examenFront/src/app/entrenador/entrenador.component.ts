import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {EntrenadorService} from "../servicios/entrenador.service";
import {PeticionComponent} from "../peticion/peticion.component";
import {UsuarioService} from "../servicios/usuario.service";

@Component({
  selector: 'app-paciente',
  templateUrl: './entrenador.component.html',
  styleUrls: ['./entrenador.component.css'],
  providers: [EntrenadorService]
})
export class EntrenadorComponent implements OnInit {


  @Input() imagen: string;
  @Input() nombre: string;
  @Input() apellido: string;
  @Input() idPac: number;
  @Output() selecciono: EventEmitter<string> = new EventEmitter();

  constructor(private _router: Router,) { }

  ngOnInit() {

  }

  seleccionoPaciente() {
    this.selecciono.emit( this.nombre);
    console.log('Selecciono entrenador ' + this.nombre+ ' con id: ' + this.idPac)
    PeticionComponent.idEnt = this.idPac;
    console.log('sklafhaksjdfhdkjsf    ' + UsuarioService.userSelect)
    this._router.navigate(['/peticion']);
  }

}
