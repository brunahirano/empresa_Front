import { HttpClient } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { delay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CargoService } from 'src/app/servicos/cargo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Mentor } from '../../../models/MentorModel';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MentorService } from 'src/app/servicos/mentor.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-lista-mentor-com-cargo',
  templateUrl: './lista-mentor-com-cargo.component.html',
  styleUrls: ['./lista-mentor-com-cargo.component.css'],
})

export class ListaMentorComCargoComponent implements OnInit {

  foto: any;

  mentores: any[] = [];

  mentor: Mentor = {
    id_mentor: '',
    mentor_cargo: '',
    mentor_foto: '',
    mentor_nome: '',
    mentor_cpf: '',
  };



  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(
    private mentorService: MentorService,
    private route: ActivatedRoute,
    private observer: BreakpointObserver,
   private cargoService: CargoService, private http: HttpClient, private location: Location
  ) {}

  ngOnInit(): void {
    this.mostraMentoresComCargo();
  }

  //buscar mentores com cargos
  mostraMentoresComCargo() {
    this.mentorService.buscarMentoresComCargo().subscribe((resultado) => {

      resultado.forEach((mentor: any[]) => {
        console.log(resultado);

        let mentorComCargo: any = {
          id_mentor: '',
          mentor_nome: '',
          mentor_cargo: '',
          mentor_foto: '',
          mentor_cpf: '',
          id_cargo: '',
          ca_nome: '',
          car_atribuicao: '',
        };

        mentorComCargo.id_mentor = mentor[0];
        mentorComCargo.mentor_nome = mentor[1];
        mentorComCargo.mentor_cargo = mentor[2];
        mentorComCargo.mentor_foto = mentor[3];
        mentorComCargo.mentor_cpf = mentor[4];

        if (mentor[5] != null) {
          mentorComCargo.id_cargo = mentor[5];
          mentorComCargo.ca_nome = mentor[6];
          console.log(mentor[5]);
          mentorComCargo.car_atribuicao = mentor[7];
        } else {
          mentorComCargo.id_cargo = 0;
          mentorComCargo.ca_nome = '----';
          mentorComCargo.car_atribuicao = '----';
        }

        this.mentores.push(mentorComCargo);
        console.log(this.mentores);
      });
    });
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 768px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  } //ngAfterViewInit

  //método para subir foto do mentorpara o banco de dados
  subirFoto(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.foto = event.target.files[0];
      console.log(this.foto);

      const formData = new FormData();

      formData.append('foto', this.foto);

      const nome: string =
        this.mentor.mentor_nome + '-' + event.target.files[0].name;

      this.http.post(
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
}
