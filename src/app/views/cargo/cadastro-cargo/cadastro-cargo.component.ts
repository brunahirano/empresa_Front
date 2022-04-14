import { CargoService } from 'src/app/servicos/cargo.service';
import { Cargo } from 'src/app/models/CargoModel';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-cargo',
  templateUrl: './cadastro-cargo.component.html',
  styleUrls: ['./cadastro-cargo.component.css']
})
export class CadastroCargoComponent implements OnInit {

  cargo:Cargo = {
    ca_nome: '',
    car_atribuicao: ''
  }

  constructor(private cargoService: CargoService,
              private router: Router) { }

  ngOnInit(): void {
  }

  //Método para cadastrar cargo
  cadastrarCargo(){
    this.cargoService.cadastrarCargo(this.cargo).subscribe((resultado)=>{
      this.cargoService.mensagem('Cargo cadastrado com sucesso')
      this.router.navigate(['/cargo/lista'])
    })
  }

}
