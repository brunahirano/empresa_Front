import { CargoService } from 'src/app/servicos/cargo.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Funcionario } from 'src/app/models/FuncionarioModel';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionarioService } from 'src/app/servicos/funcionario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-func-com-cargo',
  templateUrl: './lista-func-com-cargo.component.html',
  styleUrls: ['./lista-func-com-cargo.component.css']
})
export class ListaFuncComCargoComponent implements OnInit {

  foto: any;

  funcionarios: any [] = []

  func : Funcionario ={
    id_funcionario: '',
    func_nome: '',
    func_cidade: '',
    func_foto: '',
    func_cpf: ''
  }

  constructor(private funcService: FuncionarioService,
    private route: ActivatedRoute, private router: Router,
    private modalService: NgbModal, private cargoService: CargoService) {

   }

  ngOnInit(): void {
     this.mostrarListaFuncComCargo()
  }

  //Método para mostrar lista de funcionários com cargo
  mostrarListaFuncComCargo(){
    this.funcService.buscarFuncComCargo().subscribe((resultado) =>{

      resultado.forEach((func: any[])=>{
        console.log(resultado)

        let funcComCargo: any = {
          id_funcionario: '',
          func_nome: '',
          func_cidade: '',
          func_foto: '',
          func_cpf: '',
          id_cargo: '',
          ca_nome: '',
          car_atribuicao: ''
        }

        funcComCargo.id_funcionario = func[0]
        funcComCargo.func_nome = func[1]
        funcComCargo.func_cidade = func [2]
        funcComCargo.func_foto = func [3]
        funcComCargo.func_cpf = func [4]

        if(func[5] != null){
          funcComCargo.id_cargo = func [5]
          funcComCargo.ca_nome= func[6]
          funcComCargo.car_atribuicao= func[7]
        }else{
          funcComCargo.id_cargo = 0
          funcComCargo.ca_nome= "-----"
          funcComCargo.car_atribuicao= "-----"
        }
        this.funcionarios.push(funcComCargo)
        console.log(this.funcionarios)
        });
    })
  }





}


