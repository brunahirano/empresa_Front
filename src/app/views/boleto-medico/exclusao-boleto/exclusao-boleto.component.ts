import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CargoService } from 'src/app/servicos/cargo.service';
import { ActivatedRoute } from '@angular/router';
import { Boleto } from './../../../models/BoletoMedicoModel';
import { Component, OnInit } from '@angular/core';
import { BoletoMedicoService } from 'src/app/servicos/boleto-medico.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-exclusao-boleto',
  templateUrl: './exclusao-boleto.component.html',
  styleUrls: ['./exclusao-boleto.component.css']
})
export class ExclusaoBoletoComponent implements OnInit {

  boleto:Boleto ={
    codigo:'',
    bo_descricao:'',
    bo_dataVencimento:'',
    bo_status:'',
    bo_valor:0 //valor do boleto iniciado com 0
  }

  id_funcionario: any
  codigo: any

  //modal
  closeResult = '';

  statusParaEscolha:string[] = []

  constructor(private boletoService: BoletoMedicoService, private cargoService: CargoService,
    private route: ActivatedRoute, private modalService: NgbModal,
    private location: Location) { }

  ngOnInit(): void {
    this.boleto.codigo = this.route.snapshot.paramMap.get('codigo') //pegar codigo do boleto pela rota
    this.id_funcionario = this.route.snapshot.paramMap.get('id_funcionario') //pegar id_funcionario pela rota

    this.statusParaEscolha = ['RECEBIDO','CANCELADO','PENDENTE']
    this.buscarUmBoleto()
  }

  //método buscar um boleto pelo seu codigo
  buscarUmBoleto() {
    this.boletoService.buscarUmBoleto(this.boleto.codigo).subscribe((resultado) => {
      this.boleto = resultado
      console.log(resultado.bo_dataVencimento)
      //exemplo: 03-05T03:00:00.000+00:00
      this.boleto.bo_dataVencimento = resultado.bo_dataVencimento.slice(0,10) //estou pegando só a data (que são 10 caracteres) para mostrar no front, tiro o horário
      console.log(this.boleto.bo_dataVencimento)
      //após o slice 2022-03-09
    })
  }

  //método excluir boleto
  excluirBoleto() {
    this.boletoService.excluirBoleto(this.boleto.codigo).subscribe({
      complete: () => {
        this.cargoService.mensagem("Boleto excluído com sucesso.")
        this.location.back()
      },
      error: () => {
        this.cargoService.mensagem("Boleto não excluído.")
        this.location.back()
      },
      next: () => { console.log("Boleto excluído.") }
    });
  }

  //modal
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  } //open

  //função para capturar a forma com que o modal foi fechado
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}


