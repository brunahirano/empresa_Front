import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CargoService } from 'src/app/servicos/cargo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MentorService } from 'src/app/servicos/mentor.service';
import { Mentor } from './../../../models/MentorModel';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edicao-mentor',
  templateUrl: './edicao-mentor.component.html',
  styleUrls: ['./edicao-mentor.component.css'],
})
export class EdicaoMentorComponent implements OnInit {

  id_cargo: any = ''

  mentorCadastrado: boolean = false;

  foto: any;

  mentor: Mentor = {
    id_mentor: '',
    mentor_cargo: '',
    mentor_foto: '',
    mentor_nome: '',
  };

  //modal
  closeResult = '';

  constructor(
    private mentorService: MentorService,
    private cargoService: CargoService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private location: Location,  private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.mentor.id_mentor = this.route.snapshot.paramMap.get('id_mentor')!
    this.id_cargo = this.route.snapshot.paramMap.get('id_cargo')!
    this.mostrarUmMentor();
  }

  //rota do botão voltar
  cancelarEdicao() {
    this.router.navigate([`/mentor/mentorComCargo`]);
  }

  //Método para buscar um mentor pelo seu id
  mostrarUmMentor() {
    this.mentorService
      .buscarUmMentor(this.mentor.id_mentor)
      .subscribe((resultado) => {
        this.mentor = resultado;
        console.log(this.mentor);
      });
  }

  //Método para editar mentor
  editarMentor() {
    if (this.id_cargo != 0) {
      this.mentorService.editarMentor(this.mentor, this.mentor.id_mentor, this.id_cargo).subscribe({
        complete: () => {
          this.cargoService.mensagem("Mentor(a) editado(a) com sucesso!")
          this.location.back();
        },
        error: () => {
          this.cargoService.mensagem("Erro ao editar mentor(a).")
          this.location.back();
        },
        next: () => console.log("Mentor(a) editado(a).")
      })
    } else {
      this.mentorService.editarMentorSemCargo(this.mentor, this.mentor.id_mentor).subscribe({
        complete: () => {
          this.cargoService.mensagem("Mentor(a) editado(a) com sucesso!")
          this.location.back();
        },
        error: () => {
          this.cargoService.mensagem("Erro ao editar mentor(a).")
          // this.location.back();
        },
        next: () => console.log("Mentor(a) editado(a).")
      })
    }
  }

  //Método para enviar foto do mentor para o banco de dados
  subirFoto(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.foto = event.target.files[0];
      console.log(this.foto);

      const formData = new FormData();

      formData.append('foto', this.foto);

      const nome: string =
        this.mentor.mentor_nome + '-' + event.target.files[0].name;

      this.http
        .post(
          `http://localhost:8080/empresa/envio/${this.mentor.id_mentor}?nomeDoArquivo=${nome}`,
          formData
        )
        .subscribe({
          complete: () => {
            console.log('Foto enviado com sucesso');
          },
        });
      this.cargoService.mensagem('Foto anexada ao mentor');
      this.location.back();

    }
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

  //modal tamanho sm
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
