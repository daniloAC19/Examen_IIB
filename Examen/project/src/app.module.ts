import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {EntrenadorController} from "./entrenador/entrenador.controller";
import {PokemonController} from "./pokemon/pokemon.controller";
import {AutorizacionController} from "./controladores/autorizacion.controller";
import {EntrenadorService} from "./entrenador/entrenador.service";
import {PokemonService} from "./pokemon/pokemon.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {EntrenadorEntity} from "./entrenador/entrenador.entity";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {PokemonEntity} from "./pokemon/pokemon.entity";
import {UsuarioService} from "./usuario/usuario.service";
import {UsuarioController} from "./usuario/usuario.controller";
import {TransferenciaEntity} from "./transferencia/transferencia.entity";
import {TransferenciaController} from "./transferencia/transferencia.controller";
import {TransferenciaService} from "./transferencia/transferencia.service";

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'web2018examen.mysql.database.azure.com',
      port: 3306,
      username: 'JorgeCarrillo@web2018examen',
      password: 'Web2018A',
      database: 'entrenadorPokemon',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
      ssl: true
      }),

      /*TypeOrmModule.forFeature([UsuarioEntity,], 'userConnection'),
      TypeOrmModule.forFeature([EntrenadorEntity,],'patientConnection'),
      TypeOrmModule.forFeature([PokemonEntity,],'medicineConnection'),
       */
      TypeOrmModule.forFeature([
          EntrenadorEntity,
          UsuarioEntity,
          PokemonEntity,
          TransferenciaEntity
      ]),
  ],
  controllers: [AppController, EntrenadorController, PokemonController, AutorizacionController, UsuarioController, TransferenciaController],
  providers: [AppService, EntrenadorService, PokemonService, UsuarioService, TransferenciaService],
})
export class AppModule {}
