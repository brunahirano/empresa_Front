import { HttpClient } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CargoService } from 'src/app/servicos/cargo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FuncionarioService } from 'src/app/servicos/funcionario.service';
import { Funcionario } from 'src/app/models/FuncionarioModel';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edicao-func',
  templateUrl: './edicao-func.component.html',
  styleUrls: ['./edicao-func.component.css']
})
export class EdicaoFuncComponent implements OnInit {

  id_cargo: any = ''

  funcCadastrado: boolean = false;

  foto: any;

  func: Funcionario = {
    id_funcionario: '',
    func_nome: '',
    func_cidade: ''
  }

  //modal
   closeResult = '';

  constructor(private route: ActivatedRoute, private router: Router, private funcService: FuncionarioService, private cargoService: CargoService, private location: Location,  private modalService: NgbModal,  private http: HttpClient) { }

  ngOnInit(): void {
    this.func.id_funcionario = this.route.snapshot.paramMap.get('id_funcionario')
    this.id_cargo = this.route.snapshot.paramMap.get('id_cargo')!
    this.buscarUmFunc()
  }

  //Método para buscar um funcionário pelo seu id
  buscarUmFunc(){
    this.funcService.buscarUmFunc(this.func.id_funcionario).subscribe((resultado) =>{
      this.func = resultado
    })
  }

  //Método para editar funcionário
  editarFunc() {
    if (this.id_cargo != 0) {
      this.funcService.editarFunc(this.func, this.func.id_funcionario, this.id_cargo).subscribe({
        complete: () => {
          this.cargoService.mensagem("Funcionário editado com sucesso!")
          this.location.back();
        },
        error: () => {
          this.cargoService.mensagem("Erro ao editar funcionário.")
          this.location.back();
        },
        next: () => console.log("Funcionário editado.")
      })
    } else {
      this.funcService.editarFuncSemCargo(this.func, this.func.id_funcionario).subscribe({
        complete: () => {
          this.cargoService.mensagem("Funcionário editado com sucesso!")
          this.location.back();
        },
        error: () => {
          this.cargoService.mensagem("Erro ao editar funcionário.")
          this.location.back();
        },
        next: () => console.log("Funcionário editado.")
      })
    }
  }

  //Método para enviar foto do funcionário para o banco de dados
  subirFoto(event: any) {
    if (event.target.files && event.target.files[0]) {
      //se subiu um arquivo && se ele está na posição 0-já que vamos trabalhar só com uma foto
      this.foto = event.target.files[0];
      console.log(this.foto);

      const formData = new FormData(); //permite que essa variável tenha vários atributos e conteúdo do atributo, como se fosse um objeto

      formData.append('foto', this.foto); // usamos o append para colocar esse novo atributo na variável

      const nome: string =
        this.func.func_nome + '-' + event.target.files[0].name;

      this.http.post(
          `http://localhost:8080/empresa/envioFotoFunc/${this.func.id_funcionario}?nomeDoArquivo=${nome}`,
          formData
        )
        .subscribe({
          complete: () => {
            console.log('Foto enviado com sucesso');
          },
        });
      this.cargoService.mensagem('Foto anexada ao funcionario');
      this.location.back();
    }
  }

  //Para abrir modal
  openSm(content: any) {
    this.modalService.open(content, { size: 'sm', ariaLabelledBy: 'modal-basic-title' })
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
  } //getDismissReason

}
