export interface EntrenadorInterface {

  id_entrenador: number,
  nombres: string,
  apellidos: string,
  fechaNacimiento:Date,
  numeroMedallas:number,
  campeonActual:boolean,
  img_entrenador: string,
  idFk: number,
}
