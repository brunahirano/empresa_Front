import { CargoService } from 'src/app/servicos/cargo.service';
import { ActivatedRoute } from '@angular/router';
import { Boleto } from './../../../models/BoletoMedicoModel';
import { Component, OnInit } from '@angular/core';
import { BoletoMedicoService } from 'src/app/servicos/boleto-medico.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edicao-boleto',
  templateUrl: './edicao-boleto.component.html',
  styleUrls: ['./edicao-boleto.component.css']
})
export class EdicaoBoletoComponent implements OnInit {

  codigo: any
  id_funcionario: any

  boleto: Boleto = {
    codigo:'',
    bo_descricao: '',
    bo_dataVencimento: '',
    bo_valor: 0, //valor do boleto iniciado com 0
    bo_status: ''
  }

  constructor(private boletoService: BoletoMedicoService,
    private route: ActivatedRoute, private cargoService: CargoService,
    private location: Location) { }

  ngOnInit(): void {
    this.codigo = this.route.snapshot.paramMap.get('codigo') //pegar codigo do boleto pela rota
    this.id_funcionario = this.route.snapshot.paramMap.get('id_funcionario') //pegar id_funcionario pela rota
    this.buscarBoleto()
  }

  //método para buscar boletos, através do seu código
  buscarBoleto(){
    this.boletoService.buscarUmBoleto(this.codigo).subscribe(resultado =>{
      this.boleto = resultado
      console.log(resultado.bo_dataVencimento)
      //exemplo: 03-05T03:00:00.000+00:00
      this.boleto.bo_dataVencimento = resultado.bo_dataVencimento.slice(0,10) //estou pegando só a data (que são 10 caracteres) para mostrar no front, tiro o horário
      console.log(this.boleto.bo_dataVencimento)
      //após o slice 2022-03-09
    })
  }

  //método para editar boleto
  editarBoleto(){
    this.boletoService.editarBoleto(this.boleto, this.codigo, this.id_funcionario).subscribe({
      complete: () =>{this.cargoService.mensagem("Boleto editado com sucesso")
                      this.location.back()},
      error: erro =>{
        this.cargoService.mensagem("Erro: erro ao editar o boleto")
                      this.location.back()
      }
    })
  }

}
