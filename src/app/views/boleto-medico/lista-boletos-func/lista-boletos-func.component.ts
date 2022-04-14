import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CargoService } from 'src/app/servicos/cargo.service';
import { Boleto } from './../../../models/BoletoMedicoModel';
import { FuncionarioService } from 'src/app/servicos/funcionario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BoletoMedicoService } from 'src/app/servicos/boleto-medico.service';

@Component({
  selector: 'app-lista-boletos-func',
  templateUrl: './lista-boletos-func.component.html',
  styleUrls: ['./lista-boletos-func.component.css']
})
export class ListaBoletosFuncComponent implements OnInit {

  id_funcionario: any;
  nomeFunc: String = ''

  boletos: Boleto[] = [];

  nameStatus: String = ''

  recebido:boolean = false
  cancelado:boolean = false

  boleto:Boleto ={
    codigo:'',
    bo_descricao:'',
    bo_dataVencimento:'',
    bo_status:'',
    bo_valor:0 //valor do boleto iniciado com 0
  }

  //modal
  closeResult = '';

  constructor(
    private boletoService: BoletoMedicoService,
    private route: ActivatedRoute, private cargoService: CargoService,
    private router: Router, private funcService: FuncionarioService, private modalService: NgbModal
  ) {}


  ngOnInit(): void {
    this.id_funcionario = this.route.snapshot.paramMap.get('id_funcionario'); //pegar id_funcionario pela rota
    this.listarBoletos();
    this.buscarNomeFunc();
  }

  //método para listar todos os boletos do funcionário
  listarBoletos() {
    this.boletoService.buscarBoletosDosFuncionarios(this.id_funcionario).subscribe((resultado) => {
        this.boletos = resultado;
        console.log(resultado)
      });
  }

  //método para buscar o nome do funcionário
  buscarNomeFunc(){
    this.funcService.buscarUmFunc(this.id_funcionario).subscribe(resultado =>{
      this.nomeFunc = resultado.func_nome
    })
  }

  //método para pagar boleto
  pagarBoleto(codigo: any){

    this.boletoService.buscarUmBoleto(codigo).subscribe(resultado =>{
      this.boleto = resultado

      console.log(this.boleto)

      this.boletoService.pagarBoleto(this.boleto,this.boleto.codigo).subscribe({
        complete: () => {this.cargoService.mensagem("Boleto pago com sucesso")
                         this.listarBoletos()},
        error: () => {this.cargoService.mensagem("Erro: O Boleto não foi pago")}
      })
    })
  }

  //método para cancelar boleto
  cancelarBoleto(codigo: any){
    this.boletoService.buscarUmBoleto(codigo).subscribe(resultado =>{
      this.boleto = resultado

      console.log(this.boleto)

      this.boletoService.cancelarBoleto(this.boleto,this.boleto.codigo).subscribe({
        complete: () => {this.cargoService.mensagem("Boleto cancelado com sucesso")
                         this.listarBoletos()},
        error: () => {this.cargoService.mensagem("Erro: Boleto não cancelado")}
      })
    })

  }

  // modal
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
  }

  // função para capturar a forma com que o modal foi fechado
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
