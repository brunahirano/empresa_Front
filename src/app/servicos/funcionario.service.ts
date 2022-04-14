import { Cargo } from 'src/app/models/CargoModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Funcionario } from './../models/FuncionarioModel';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  baseUrl: String = 'http://localhost:8080/empresa'

  constructor(private http: HttpClient) {

  }

  //serviço para mostrar funcionário com cargo
   mostrarFuncCargo(id_cargo: string): Observable<Funcionario[]>{ //observable veio para substituir o promise, pois com ele podemos enviar mais de uma requisição ao mesmo tempo
    const url = `${this.baseUrl}/funcionario/busca-cargo/${id_cargo}`
    return this.http.get<Funcionario[]>(url) // o return é um array de funcionarios
  }

  //serviço para mostrar todos os funcionários do cargo
  todosFuncDoCargo():Observable<any>{
    const url = `${this.baseUrl}/func-cargo`
    return this.http.get<any>(url)
  }

  //serviço para buscar funcionarios com cargo
  buscarFuncComCargo():Observable<any[]>{
    const url = `${this.baseUrl}/funcionario/func-cargo`
    return this.http.get<any>(url)
  }

  //serviço para buscar funcionário pelo seu id
  buscarUmFunc(id_funcionario: string):Observable<Funcionario>{
    const url = `${this.baseUrl}/funcionario/${id_funcionario}`
    return this.http.get<Funcionario>(url)
  }

  //serviço para cadastrar funcionário
  cadastrarFunc(func:Funcionario):Observable<Funcionario>{
    const url = `${this.baseUrl}/funcionario`
    return this.http.post<Funcionario>(url, func);
  }

  //serviço para deletar um funcionário através do seu id
  deleteUmFunc(id_funcionario: string): Observable<void>{
    const url = `${this.baseUrl}/funcionario/${id_funcionario}`
    return this.http.delete<void>(url)
  }

  //serviço para editar funcionário sem cargo
  editarFuncSemCargo(func: Funcionario, id_funcionario:String): Observable<Funcionario> {
    const URL = `${this.baseUrl}/funcionario-sem-cargo/${id_funcionario}` //tem cque ser igual ao PutMapping do Eclipse
    return this.http.put<Funcionario>(URL, func)
  }

  //serviço para editar funcionário com cargo
  editarFunc(func: Funcionario, id_funcionario:String, id_cargo: String): Observable<Funcionario> {
    const URL = `${this.baseUrl}/funcionario/${id_funcionario}?cargo=${id_cargo}` //tem que ser igual ao PutMapping do Eclipse
    return this.http.put<Funcionario>(URL, func)
  }

  //serviço para atribuir cargo ao funcionário
  atribuirCargo(cargo:Cargo, id_funcionario:String):Observable<Funcionario>{

  const url = `${this.baseUrl}/funcionario/inserirCargo/${id_funcionario}`
  return this.http.put<Funcionario>(url,cargo)

  }

  //buscar funcionario por id_cargo
  buscarFuncPorId(id_cargo: string):Observable<Funcionario[]>{
    const url = `${this.baseUrl}/funcionario/busca-cargo/${id_cargo}`
    return this.http.get<Funcionario[]>(url)
  }

  //deixar funcionário sem cargo
  deixarFuncSemCargo(funcionario: Funcionario, id_funcionario:String): Observable<Funcionario>{
    const url = `${this.baseUrl}/funcionario/deixarSemCargo/${id_funcionario}`
    return this.http.put<Funcionario>(url, funcionario)
  }

  //serviço para buscar o funcionário pelo cpf
  buscarFuncPeloCpf(func_cpf:String):Observable<Funcionario>{
    const url = `${this.baseUrl}/func-cpf/${func_cpf}`
    return this.http.get<Funcionario>(url)
  }

}

