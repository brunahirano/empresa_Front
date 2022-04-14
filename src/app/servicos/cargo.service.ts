import { Cargo } from './../models/CargoModel';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CargoService {


  baseUrl: String = 'http://localhost:8080/empresa'

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  //serviço para mostrar todos os cargos
  mostrarTodosCargos(): Observable<Cargo[]>{ //observable veio para substituir o promise, pois com ele podemos enviar mais de uma requisição ao mesmo tempo
    const url = `${this.baseUrl}/cargo`
    return this.http.get<Cargo[]>(url) // o return é um array de turmas, todas as turmas []
  }

  //serviço para mostrar todos os cargos sem mentor
  mostrarCargosSemMentor():Observable<Cargo[]>{

    const url = `${this.baseUrl}/cargoSemMentor`

    return this.http.get<Cargo[]>(url)
  }

  //serviço para monstrar um cargo
  mostrarUmCargo(id: string): Observable<Cargo>{
    const url = `${this.baseUrl}/cargo/${id}`
    return this.http.get<Cargo>(url)
  }

  //serviço para buscar cargo do mentor
  buscarCargoDoMentor(id_mentor:String):Observable<Cargo>{

    const url = `${this.baseUrl}/cargo/cargo-mentor/${id_mentor}`
    return this.http.get<Cargo>(url)
  }

  //serviço para buscar todos os cargos
  buscarTodosCargos():Observable<any>{
    const url = `${this.baseUrl}/cargo/cargo-mentor`
    return this.http.get<any>(url)
  }

  //serviço para cadastrar cargo
  cadastrarCargo(cargo:Cargo):Observable<Cargo>{
    const url = `${this.baseUrl}/cargo`
    return this.http.post<Cargo>(url, cargo) //aqui nós estamos cadastrando um único cargo, por isso não tem []
  }

 //serviço para excluir cargo através do seu id
  excluirCargo(id: String):Observable<void>{
    const url = `${this.baseUrl}/cargo/${id}`
    return this.http.delete<void>(url) //delete url retorno void, sem retorno
  }

 //serviço para editar cargo através do seu id
  editarCargo(cargo:Cargo):Observable<Cargo>{
    const url = `${this.baseUrl}/cargo/${cargo.id_cargo}`
    return this.http.put<Cargo>(url, cargo) //delete url retorno void, sem retorno
  }

  //serviço para atribuir mentor para o cargo
  atibuirMentorParaCargo(cargo: Cargo, id_cargo: String, id_mentor:String):Observable<void>{
    const url = `${this.baseUrl}/cargo/definirMentor/${id_cargo}/${id_mentor}`
    return this.http.put<void>(url, cargo);
  }

  //serviço para deixar o mentor sem cargo
  deixarMentorSemCargo(cargo:Cargo,id_cargo:String, id_mentor:String):Observable<void>{

   const url = `${this.baseUrl}/cargo/tirarMentor/${id_cargo}/${id_mentor}`
    return this.http.put<void>(url,cargo);
  }

  //serviço para deixar cargo sem mentor
  deixarCargoSemMentor(cargo: Cargo, id_cargo:String, id_mentor:String): Observable<void>{
    const url = `${this.baseUrl}/cargo/deixarCargoSemMentor/${id_cargo}/${id_mentor}`
    return this.http.put<void>(url, cargo)
  }

 // Método referente ao MatSnackBar do Material, para mostrar mensagem quando as funções de CRUD funcionarem
  mensagem(msg: string): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: ['cor-mensagem']
    })
  }

}
