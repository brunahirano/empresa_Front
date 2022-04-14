import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { MentorService } from 'src/app/servicos/mentor.service';
import { CargoService } from './../../../servicos/cargo.service';
import { Cargo } from './../../../models/CargoModel';
import { Mentor } from 'src/app/models/MentorModel';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-atribuir-cargo-ao-mentor',
  templateUrl: './atribuir-cargo-ao-mentor.component.html',
  styleUrls: ['./atribuir-cargo-ao-mentor.component.css'],
})
export class AtribuirCargoAoMentorComponent implements OnInit{

  cargos: Cargo[] = []
  cargoEscolhido: any = []
  id_mentor: any
  id_cargo: any
  cargoDoMentor: any = []

  // cargosSemMentor: any;
  // cargoSemMentorEscolhido: any = [];
  // mentorSemCargoEscolhido: any = [];


  mentor: Mentor = {
    id_mentor: '',
    mentor_cargo: '',
    mentor_foto: '',
    mentor_nome: '',
    mentor_cpf: '',
  };

  // cargo: Cargo = {
  //   id_cargo: '',
  //   ca_nome: '',
  //   car_atribuicao: ''
  // };

  //modal
  closeResult = '';

  constructor(
    private cargoService: CargoService,
    private mentorService: MentorService,
    private router: Router,
    private route: ActivatedRoute, private modalService: NgbModal, private location: Location
  ) {}

  ngOnInit(): void {
    this.id_mentor = this.route.snapshot.paramMap.get('id_mentor');
    this.id_cargo = this.route.snapshot.paramMap.get("id_cargo")!; //pegar id_cargo pela rota
    this.buscarTodosCargos();
    this.buscarMentor();
    this.buscarCargo();
    // this.buscarMentorDoCargo();
    // this.buscarCargoSemMentor();
    // this.mostrarMentor();

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

  //Método para buscar mentor através do seu id
  buscarMentor() {
    this.mentorService.buscarUmMentor(this.id_mentor).subscribe((resultado) => {
      this.mentor = resultado;
    });
  }

  //Método para buscar o cargo pelo seu id
  buscarCargo(){
    this.cargoService.mostrarUmCargo(this.id_cargo).subscribe(resultado =>{
      this.cargoEscolhido = resultado
      console.log(this.cargoDoMentor)
    })
  }

  //Atribuir cargo ao mentor
   atribuirCargo() {
      this.mentorService.atribuirCargo(this.cargoEscolhido, this.id_mentor).subscribe({

      complete: () => {  this.cargoService.mensagem("Cargo atribuido ao mentor com sucesso")
      this.location.back();
                      },
      error: () => {  this.cargoService.mensagem("Erro: Cargo não atribuido a(o) mentor(a)")
      this.location.back();
                      },
      next: () => { console.log("Cargo atribuido com sucesso")}
    })
  }

   //Método para deixar mentor sem cargo
  deixarMentorSemCargo(){
    this.mentorService.deixarMentorSemCargo(this.mentor,this.id_mentor).subscribe({
      complete: () => {  this.cargoService.mensagem("Mentor ficou sem cargo")
      this.location.back();
                      },
      error: () => {  this.cargoService.mensagem("Erro: Mentor não ficou sem cargo")
      this.location.back();
                      },
      next: () => { console.log("Concluido, ficou sem cargo")}

      });

  }

  // Modal
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
