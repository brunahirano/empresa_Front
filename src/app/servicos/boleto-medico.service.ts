import { Observable } from 'rxjs';
import { Boleto } from './../models/BoletoMedicoModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class BoletoMedicoService {

  baseUrl: String = 'http://localhost:8080/empresa';

  constructor(private http: HttpClient) {}

  //servico para buscar um boleto
  buscarUmBoleto(codigo: string): Observable<Boleto> {
    const url = `${this.baseUrl}/funcionario/boleto/${codigo}`;
    return this.http.get<Boleto>(url);
  }

  //serviço para buscar os boleto do funcionário pelo id_funcionario
  buscarBoletosDosFuncionarios(id_funcionario: String): Observable<Boleto[]> {
    const url = `${this.baseUrl}/funcionario/boleto-func/${id_funcionario}`;
    return this.http.get<Boleto[]>(url);
  }

  //serviço para criar um boleto para o funcionário
  criarBoleto(boleto: Boleto, id_funcionario: String): Observable<Boleto> {
    const url = `${this.baseUrl}/funcionario/boleto/${id_funcionario}`;
    return this.http.post<Boleto>(url, boleto);
  }

  //serviço para pagar um boleto, através de seu código
  pagarBoleto(boleto: Boleto, codigo: any): Observable<Boleto> {
    const url = `${this.baseUrl}/funcionario/pagar-boleto/${codigo}`;
    return this.http.put<Boleto>(url, boleto);
  }

  //serviço para cancelar um boleto, através de seu código
  cancelarBoleto(boleto: Boleto, codigo: any): Observable<Boleto> {
    const url = `${this.baseUrl}/funcionario/cancelar-boleto/${codigo}`;
    return this.http.put<Boleto>(url, boleto);
  }

  //serviço para editar um boleto, através de seu código e id_funcionario
  editarBoleto(boleto: Boleto, codigo: any,
    id_funcionario: any): Observable<Boleto> {
    const url = `${this.baseUrl}/funcionario/editar-boleto/${codigo}/${id_funcionario}`;
    return this.http.put<Boleto>(url, boleto);
  }

  //serviço para excluir um boleto, através de seu código
  excluirBoleto(codigo: string): Observable<Boleto> {
    const URL = `${this.baseUrl}/funcionario/deletar-boleto/${codigo}`
    return this.http.delete<Boleto>(URL)
  }

}
