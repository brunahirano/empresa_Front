import { Cargo } from 'src/app/models/CargoModel';
import { Component, OnInit } from '@angular/core';
import { CargoService } from 'src/app/servicos/cargo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edicao-cargo',
  templateUrl: './edicao-cargo.component.html',
  styleUrls: ['./edicao-cargo.component.css']
})
export class EdicaoCargoComponent implements OnInit {

  cargo:Cargo = {
    ca_nome: '',
    car_atribuicao: ''
  }

  constructor(private cargoService: CargoService, private route: ActivatedRoute, private router: Router) { }

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

  //Método editar cargo
  editarCargo(){
    this.cargoService.editarCargo(this.cargo).subscribe({
      next: () => {
        this.cargoService.mensagem('Cargo editado com sucesso!')
      },
      error: erro => {
        this.cargoService.mensagem('O cargo não pode ser editado.')
        this.router.navigate(['/cargo/lista'])
      },
      complete: () => {
        console.info('Complete')
        this.router.navigate(['/cargo/lista'])
      }
    })
  }
}
