import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { CargoService } from 'src/app/servicos/cargo.service';
import { MentorService } from 'src/app/servicos/mentor.service';
import { Component, OnInit } from '@angular/core';
import { Cargo } from 'src/app/models/CargoModel';
import { Mentor } from 'src/app/models/MentorModel';
import { Location } from '@angular/common';

@Component({
  selector: 'app-mentor-do-cargo',
  templateUrl: './mentor-do-cargo.component.html',
  styleUrls: ['./mentor-do-cargo.component.css']
})
export class MentorDoCargoComponent implements OnInit {

  id_cargo: any;

  mentorCadastrado: boolean = false;

  mentoresSemCargo: any;

  mentorSemCargoEscolhido: any = [];

  mentor: Mentor = {
    id_mentor: '',
    mentor_cargo: '',
    mentor_foto: '',
    mentor_nome: '',
  };

  cargo: Cargo = {
    id_cargo: '',
    ca_nome: '',
    car_atribuicao: ''
  }

  //modal
  closeResult = '';


  constructor(private mentorService: MentorService, private cargoService: CargoService,  private route: ActivatedRoute,  private router: Router, private location: Location, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.id_cargo = this.route.snapshot.paramMap.get('id_cargo');
    this.buscarMentorDoCargo()
    this.buscarMentoresSemCargo()
    this.mostrarUmCargo()
  }

  //Mostrar um cargo pelo seu id
  mostrarUmCargo(){
    this.cargoService.mostrarUmCargo(this.id_cargo).subscribe((resultado)=> {
      this.cargo = resultado
      console.log(this.cargo)
    })
  }

  //método para buscar o mentor pelo id_cargo
  buscarMentorDoCargo() {
    this.mentorService.buscarMentorDoCargo(this.id_cargo)
      .subscribe((resultado) => {
        if (resultado == undefined) {
          this.cargoService.mensagem('Este cargo não têm mentor!')
          this.mentorCadastrado = false;
        } else {
          this.mentor = resultado; // vai popular os inputs
          this.mentorCadastrado = true;
        }
      })
  }

  //Método para buscar o mentor sem cargo
  buscarMentoresSemCargo() {
    this.mentorService.buscarMentoresSemCargo().subscribe((resultado) => {
      this.mentoresSemCargo = resultado;
      console.log(this.mentoresSemCargo)
    })
  }

  //mostrar mentor sem cargo do select (html)
  mostrarMentor(){
    console.log(this.mentorSemCargoEscolhido)
    this.mentor = this.mentorSemCargoEscolhido
  }

  //mátodo para tribuir mentor para o cargo
  atribuirMentorParaCargo() {
  this.cargoService.mostrarUmCargo(this.id_cargo).subscribe((resultado)=>{
    this.cargo = resultado

  })

  this.cargoService.atibuirMentorParaCargo(this.cargo, this.id_cargo,this.mentor.id_mentor).subscribe({
    next: () => {
      console.log("atribuido")
      this.cargoService.mensagem('Mentor atibuído para o cargo!')
      this.router.navigate([`/cargo/lista`]);
    },
    error: erro => {
      this.cargoService.mensagem("O mentor não pode ser atribuido.")
      this.router.navigate([`/cargo/lista`]);
    },
    complete: () => {
      console.info('Complete')
    }

  })

  }


  //Método para excluir cargo do mentor, deixa-lo sem cargo
  deixarCargoSemMentor(){
    this.cargoService.deixarCargoSemMentor(this.cargo,this.id_cargo, this.mentor.id_mentor).subscribe({
      complete: () => {  this.cargoService.mensagem("Cargo ficou sem mentor")
      this.location.back();
                      },
      error: () => {  this.cargoService.mensagem("Erro: Cargo não ficou sem mentor")
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
