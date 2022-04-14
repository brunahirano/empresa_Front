import { Mentor } from 'src/app/models/MentorModel';
import { MentorService } from 'src/app/servicos/mentor.service';
import { CargoService } from 'src/app/servicos/cargo.service';
import { Cargo } from '../../../models/CargoModel';
import { FuncionarioService } from '../../../servicos/funcionario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcionario } from 'src/app/models/FuncionarioModel';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-lista-func',
  templateUrl: './lista-func-do-cargo.component.html',
  styleUrls: ['./lista-func-do-cargo.component.css']
})
export class ListaFuncDoCargoComponent implements OnInit {

  funcionarios: Funcionario [] = []

  id_cargo: any

  cargo:Cargo = {
    ca_nome: '',
    car_atribuicao: ''
  }


  constructor(private funcService: FuncionarioService, private cargoService: CargoService, private route: ActivatedRoute, private router: Router)
    {  }

  ngOnInit(): void {
    this.id_cargo = this.route.snapshot.paramMap.get('id_cargo')!; //pegar id_cargo pela rota
    this.mostrarUmCargo()
    this.mostrarFuncDoCargo();
  }

  //mostrar funcionários do cargo
  mostrarFuncDoCargo(){
    this.funcService.buscarFuncPorId(this.id_cargo).subscribe(resultado =>{
      this.funcionarios = resultado
      console.log(this.funcionarios)
    })
  }

  //mostrar cargo pelo id_cargo
  mostrarUmCargo(){
    this.cargoService.mostrarUmCargo(this.id_cargo).subscribe((resultado)=> {
      this.cargo = resultado
      console.log(this.cargo)
    })
  }

}
