import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CargoService } from 'src/app/servicos/cargo.service';

@Component({
  selector: 'app-lista-cargo',
  templateUrl: './lista-cargo.component.html',
  styleUrls: ['./lista-cargo.component.css']
})
export class ListaCargoComponent implements OnInit {

  id_cargo: any

  cargos: any = []

  constructor(private cargoService: CargoService) { }

  ngOnInit(): void {
     this.mostrarTodosCargos();
  }

  //Método para mostrar todos os cargos
  mostrarTodosCargos(){
    this.cargoService.buscarTodosCargos().subscribe(resultado =>{

      resultado.forEach((cargo: any[]) => {

        let cargoComMentor: any ={
          id_cargo:'',
          ca_nome:'',
          car_atribuicao: '',
          id_mentor:'',
          mentor_nome:'',
          mentor_cargo:''
        }

        cargoComMentor.id_cargo = cargo[0]
        cargoComMentor.ca_nome = cargo[1]
        cargoComMentor.car_atribuicao =cargo[2]
        if(cargo[3] != null){
          cargoComMentor.id_mentor = cargo[3]
          cargoComMentor.mentor_nome = cargo[4]
          cargoComMentor.mentor_cargo = cargo[5]
        }else{
          cargoComMentor.id_mentor = 0
          cargoComMentor.mentor_nome = "----"
          cargoComMentor.mentor_cargo = "----"
        }

        this.cargos.push(cargoComMentor)

      });


    })

  }



}
