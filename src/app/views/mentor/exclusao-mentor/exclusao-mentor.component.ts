import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { CargoService } from 'src/app/servicos/cargo.service';
import { MentorService } from 'src/app/servicos/mentor.service';
import { Mentor } from 'src/app/models/MentorModel';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-exclusao-mentor',
  templateUrl: './exclusao-mentor.component.html',
  styleUrls: ['./exclusao-mentor.component.css']
})
export class ExclusaoMentorComponent implements OnInit {

  mentor: Mentor ={
    id_mentor: '',
    mentor_cargo: '',
    mentor_foto: '',
    mentor_nome: '',
    mentor_cpf: ''
  }

  //modal
  closeResult = '';

  constructor(private mentorService: MentorService, private cargoService: CargoService, private route: ActivatedRoute, private router: Router, private location: Location, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.mentor.id_mentor = this.route.snapshot.paramMap.get("id_mentor")!;
    this.buscarUmMentor()
  }

  //buscar um mentor pelo seu id
  buscarUmMentor(){
    this.mentorService.buscarUmMentor(this.mentor.id_mentor).subscribe((resultado) =>{
      this.mentor = resultado
      console.log(this.mentor)
    })
  }

  //excluir mentor
  excluirMentor(){
    this.mentorService.excluirMentor(this.mentor.id_mentor).subscribe({
      next: () => {
        console.log("Excluido")
        this.cargoService.mensagem('Mentor excluido com sucesso')
        this.location.back();
      },
      error: erro => {
        this.cargoService.mensagem('Erro: O mentor não pode ser deletado, pois possui cargo associado')
        this.location.back();
      },
      complete: () => {
        console.info('Complete')
      }
    })
   }

   //rota voltar ao clicar cancelar
   cancelarExclusao() {
    this.router.navigate([`mentor/mentorComCargo`]);
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
