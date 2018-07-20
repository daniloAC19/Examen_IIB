import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import {RutasApp} from "./app.routes";
import {RouterModule} from "@angular/router";
import { SeleccionComponent } from './seleccion/seleccion.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PeticionComponent } from './peticion/peticion.component';
import { HomeComponent } from './home/home.component';
import { UsuarioComponent } from './usuario/usuario.component';
import {HttpModule} from "@angular/http";
import { EntrenadorComponent } from './entrenador/entrenador.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import {PokemonService} from "./servicios/pokemon.service";
import {UsuarioService} from "./servicios/usuario.service";
import {EntrenadorService} from "./servicios/entrenador.service";
import { CabeceraComponent } from './cabecera/cabecera.component';
import {TransferenciaService} from "./servicios/transferencia.service";
import { PeticionEsperaComponent } from './peticion-espera/peticion-espera.component';
import { PeticionAceptarComponent } from './peticion-aceptar/peticion-aceptar.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SeleccionComponent,
    PerfilComponent,
    PeticionComponent,
    HomeComponent,
    UsuarioComponent,
    EntrenadorComponent,
    PokemonComponent,
    CabeceraComponent,
    PeticionEsperaComponent,
    PeticionAceptarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(
      RutasApp,{
        useHash: true
      }
    )
  ],
  providers: [HomeComponent, PokemonService, UsuarioService, EntrenadorService, TransferenciaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
