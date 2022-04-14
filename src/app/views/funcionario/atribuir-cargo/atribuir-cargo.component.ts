import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionarioService } from 'src/app/servicos/funcionario.service';
import { CargoService } from 'src/app/servicos/cargo.service';
import { Funcionario } from 'src/app/models/FuncionarioModel';
import { Cargo } from 'src/app/models/CargoModel';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-atribuir-cargo',
  templateUrl: './atribuir-cargo.component.html',
  styleUrls: ['./atribuir-cargo.component.css']
})
export class AtribuirCargoComponent implements OnInit {

  cargos: Cargo[] = []
  cargoEscolhido: any = []
  id_cargo: any
  id_funcionario: any
  cargoDoFuncionario: any = []

  func: Funcionario = {
    id_funcionario: '',
    func_nome: '',
    func_cidade: ''
  }

   //modal
   closeResult = '';

  constructor(private cargoService: CargoService,
              private funcService: FuncionarioService,
              private route:ActivatedRoute,
              private location: Location,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.id_funcionario = this.route.snapshot.paramMap.get("id_funcionario")!; //pegar id_funcionario pela rota
    this.id_cargo = this.route.snapshot.paramMap.get("id_cargo")!; //pegar id_cargo pela rota
    this.buscarTodosCargos();
    this.mostrarFuncionario()
    this.buscarCargo();

  }

  //Método para buscar todos os cargos
  buscarTodosCargos(){
    this.cargoService.mostrarTodosCargos().subscribe(resultado =>{
      this.cargos = resultado
    })
  }

  //Método para saber o cargo escolhido no select
  mostrarCargo(){
    console.log(this.cargoEscolhido)
  }

  //Método para mostrar funcionario através do seu id
  mostrarFuncionario(){
    this.funcService.buscarUmFunc(this.id_funcionario).subscribe(resultado =>{
      this.func = resultado
    })
  }

  //Método para buscar o cargo pelo seu id
  buscarCargo(){
    this.cargoService.mostrarUmCargo(this.id_cargo).subscribe(resultado =>{
      this.cargoEscolhido = resultado
      console.log(this.cargoDoFuncionario)
    })
  }

  //Método para atribuir cargo ao funcionário
  atribuirCargo(){
    this.funcService.atribuirCargo(this.cargoEscolhido,this.id_funcionario).subscribe({
      complete: () => {  this.cargoService.mensagem("Cargo atribuido ao funcionário com sucesso")
      this.location.back();
                      },
      error: () => {  this.cargoService.mensagem("Erro: Cargo não atribuido a funcionário ")
      this.location.back();
                      },
      next: () => { console.log("Cargo atribuido com sucesso")}

      });
  }

  //Método para deixar funcionário sem cargo
  deixarFuncSemCargo(){
    this.funcService.deixarFuncSemCargo (this.func,this.id_funcionario).subscribe({
      complete: () => {  this.cargoService.mensagem("Funcionário ficou sem cargo")
      this.location.back();
                      },
      error: () => {  this.cargoService.mensagem("Erro: Funcionário não ficou sem cargo")
      this.location.back();
                      },
      next: () => { console.log("Concluido, ficou sem cargo")}

      });

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
