import { CargoService } from 'src/app/servicos/cargo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Boleto } from './../../../models/BoletoMedicoModel';
import { Component, OnInit } from '@angular/core';
import { BoletoMedicoService } from 'src/app/servicos/boleto-medico.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastrar-boleto',
  templateUrl: './cadastrar-boleto.component.html',
  styleUrls: ['./cadastrar-boleto.component.css']
})
export class CadastrarBoletoComponent implements OnInit {

  id_funcionario: any

  boleto: Boleto = {
    codigo:'',
    bo_descricao: '',
    bo_dataVencimento: '',
    bo_valor: 0,  //valor do boleto iniciado com 0
    bo_status: 'PENDENTE' //status do boleto iniciado como pendente
  }

  constructor( private boletoService: BoletoMedicoService,
    private route: ActivatedRoute, private cargoService: CargoService,
   private location: Location) { }

  ngOnInit(): void {
    this.id_funcionario = this.route.snapshot.paramMap.get('id_funcionario')! //pegar id_funcionario pela rota
  }

  //método para cadastrar boleto
  cadastrarBoleto(){
    this.boletoService.criarBoleto(this.boleto, this.id_funcionario).subscribe({
      complete: () =>{this.cargoService.mensagem("Boleto cadastrado com sucesso")
                     this.location.back();
                    },
      error: erro =>{
        this.cargoService.mensagem("ERRO: Boleto não cadastrado")
        this.location.back();
      }
    })
  }

}
