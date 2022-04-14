import { CargoService } from 'src/app/servicos/cargo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionarioService } from 'src/app/servicos/funcionario.service';
import { Funcionario } from 'src/app/models/FuncionarioModel';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';

@Component({
  selector: 'app-exclusao-func',
  templateUrl: './exclusao-func.component.html',
  styleUrls: ['./exclusao-func.component.css']
})
export class ExclusaoFuncComponent implements OnInit {

  id_cargo: String = ''

  funcionario: Funcionario ={
    id_funcionario: '',
    func_cidade: '',
    func_nome: '',
    id_cargo: ''
  }

  funcionarios: any [] = []

   //modal
   closeResult = '';


  constructor(private funcService: FuncionarioService,
    private route: ActivatedRoute,
    private router: Router, private modalService: NgbModal, private cargoService: CargoService, private location: Location)
    {
      this.funcionario.id_funcionario = this.route.snapshot.paramMap.get("id_funcionario")!;
     }

  ngOnInit(): void {
    this.buscarUmFunc()
   }

  //Método para buscar um funcionário pelo seu id
  buscarUmFunc(){
    this.funcService.buscarUmFunc(this.funcionario.id_funcionario).subscribe((resultado) =>{
      this.funcionario = resultado
      console.log(this.funcionario)
    })
  }

  //Método para excluir funcionário
  excluirFunc(){
    this.funcService.deleteUmFunc(this.funcionario.id_funcionario).subscribe({
      next: () => {
        console.log("Excluido")
        this.cargoService.mensagem('Funcionário excluido com sucesso')
        this.location.back();
      },
      error: erro => {
        this.cargoService.mensagem('Erro ao excluir funcionário')
        this.location.back();
      },
      complete: () => {
        console.info('Complete')
      }
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
  } //open

  // função para capturar a forma com que o modal foi fechado
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  } //getDismissReason


}
