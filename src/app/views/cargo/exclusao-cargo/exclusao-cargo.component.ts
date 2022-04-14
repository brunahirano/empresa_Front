import { Cargo } from 'src/app/models/CargoModel';
import { ActivatedRoute, Router } from '@angular/router';
import { CargoService } from 'src/app/servicos/cargo.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-exclusao-cargo',
  templateUrl: './exclusao-cargo.component.html',
  styleUrls: ['./exclusao-cargo.component.css']
})
export class ExclusaoCargoComponent implements OnInit {

  constructor(private cargoService: CargoService, private route: ActivatedRoute, private router: Router, private modalService: NgbModal) { }

  cargo:Cargo = {
    id_cargo: '',
    ca_nome: '',
    car_atribuicao: ''
  }

  //modal
  closeResult = '';


  ngOnInit(): void {
    this.cargo.id_cargo = this.route.snapshot.paramMap.get('id') //pegar o id da rota url
    this.mostrarUmCargo()
  }

  //Método para mostrar um cargo através do seu id
  mostrarUmCargo(){
    this.cargoService.mostrarUmCargo(this.cargo.id_cargo).subscribe((resultado)=> {
      this.cargo = resultado
      console.log(this.cargo)
    })
  }

  //Método para excluir um cargo através do seu id
  excluirCargo(){
    this.cargoService.excluirCargo(this.cargo.id_cargo).subscribe({
      next: () => {
        console.log("editada")
        this.cargoService.mensagem('Cargo excluído com sucesso!')
      },
      error: erro => {
        this.cargoService.mensagem('O cargo não pode ser excluído, pois possui mentror associado.')
        this.router.navigate(['/cargo/lista'])
      },
      complete: () => {
        console.info('Complete')
        this.router.navigate(['/cargo/lista'])
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
