import { Cargo } from './../models/CargoModel';
import { Observable } from 'rxjs';
import { Mentor } from './../models/MentorModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MentorService {

  baseUrl: String = 'http://localhost:8080/empresa'

  constructor(private http: HttpClient) { }

  //serviço para buscar um mentor pelo seu id
  buscarUmMentor(id_mentor: String):Observable<Mentor>{
    const url = `${this.baseUrl}/mentor/${id_mentor}`
    return this.http.get<Mentor>(url)
  }

  //serviço pra buscar mentor do cargo
  buscarMentorDoCargo(id_cargo: String):Observable<Mentor>{
    const url = `${this.baseUrl}/mentor-cargo/${id_cargo}`
    return this.http.get<Mentor>(url)
   }

  //serviço para buscar mentores sem cargo
  buscarMentoresSemCargo():Observable<Mentor[]>{
    const URL = `${this.baseUrl}/mentorSemCargo`
    return this.http.get<Mentor[]>(URL);
   }

  //serviço para buscar mentores com cargo
  buscarMentoresComCargo():Observable<any[]>{
     const url = `${this.baseUrl}/mentor/mentor-cargo`
     return this.http.get<any>(url)
   }

  //serviço para cadatrar mentor
  cadastrarMentor(mentor: Mentor): Observable<Mentor>{
    const url = `${this.baseUrl}/mentor`
    return this.http.post<Mentor>(url, mentor)
  }

  //serviço para excluir mentor através do seu id
  excluirMentor(id_mentor:string):Observable<void>{
    const url = `${this.baseUrl}/mentor/${id_mentor}`
    return this.http.delete<void>(url)
  }

  //serviço para editar mentor com cargo através do seu id
  editarMentor(mentor: Mentor, id_mentor: string, id_cargo: String): Observable<Mentor> {
    const URL = `${this.baseUrl}/mentor/${id_mentor}?cargo=${id_cargo}` //tem que ser igual ao PutMapping do Eclipse
    return this.http.put<Mentor>(URL, mentor)
  }

  //serviço para editar mentor através do seu id
  editarMentorSemCargo(mentor: Mentor, id_mentor:String): Observable<Mentor> {
    const URL = `${this.baseUrl}/mentorSemCargo/${id_mentor}` //tem que ser igual ao PutMapping do Eclipse
    return this.http.put<Mentor>(URL, mentor)
  }

  //serviço para buscar mentor através do seu cpf
  buscarMentorPeloCpf(mentor_cpf:String):Observable<Mentor>{
    const url = `${this.baseUrl}/mentor-cpf/${mentor_cpf}`
    return this.http.get<Mentor>(url)
  }

  //serviço para atribuir cargo ao mentor
  atribuirCargo(cargo:Cargo, id_mentor:String):Observable<Mentor>{

  const url = `${this.baseUrl}/mentor/inserirCargo/${id_mentor}`
    return this.http.put<Mentor>(url,cargo)
  }

  //deixar mentor sem cargo
  deixarMentorSemCargo(mentor: Mentor, id_mentor:String): Observable<Mentor>{
    const url = `${this.baseUrl}/mentor/deixarSemCargo/${id_mentor}`
    return this.http.put<Mentor>(url, mentor)
  }

}
