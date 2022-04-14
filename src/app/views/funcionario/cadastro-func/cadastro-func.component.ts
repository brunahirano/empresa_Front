import { HttpClient } from '@angular/common/http';
import { CargoService } from 'src/app/servicos/cargo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionarioService } from 'src/app/servicos/funcionario.service';
import { Funcionario } from 'src/app/models/FuncionarioModel';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastro-func',
  templateUrl: './cadastro-func.component.html',
  styleUrls: ['./cadastro-func.component.css'],
})
export class CadastroFuncComponent implements OnInit {

  func: Funcionario = {
    id_funcionario: '',
    func_nome: '',
    func_cidade: '',
    func_cpf: '',
    func_foto: '',
  };

  funcCadastrado: boolean = false;

  idFuncCadastrado: any;

  foto: any;

  constructor(
    private funcService: FuncionarioService,
    private route: ActivatedRoute,
    private router: Router,
    private cargoService: CargoService,
    private location: Location,
    private http: HttpClient
  ) {}

  ngOnInit(): void {

  }

  //Método para cadastrar um funcionário
  cadastrarFunc() {
    this.funcService.cadastrarFunc(this.func).subscribe({
      next: () => {
        console.log(this.func);
        this.funcService
          .buscarFuncPeloCpf(this.func.func_cpf)
          .subscribe((resultado) => {
            console.log(resultado);
            this.idFuncCadastrado = resultado.id_funcionario;
            this.funcCadastrado = true;
            this.cargoService.mensagem('Funcionário cadastrado com sucesso');
          });
      },
      error: () => {
        this.cargoService.mensagem('Não foi possível cadastrar o funcionário');
      },
    });
  }


  //Rota para cancelar cadastro
  cancelarCadastro() {
    this.router.navigate([`/funcionario/funcComCargo`]);
  }

  //Método para enviar foto do funcionário para o banco de dados
  subirFoto(event: any) {
    if (event.target.files && event.target.files[0]) {
      //se subiu um arquivo && se ele está na posição 0-já que vamos trabalhar só com uma foto
      this.foto = event.target.files[0];
      console.log(this.foto);

      const formData = new FormData(); //permite que essa variável tenha vários atributos e conteúdo do atributo, como se fosse um objeto

      formData.append('foto', this.foto); // usamos o append para colocar esse novo atributo na variável

      const nome: string =
        this.func.func_nome + '-' + event.target.files[0].name;

      this.http
        .post(
          `http://localhost:8080/empresa/envioFotoFunc/${this.idFuncCadastrado}?nomeDoArquivo=${nome}`,
          formData
        )
        .subscribe({
          complete: () => {
            console.log('Foto enviado com sucesso');
          },
        });
      this.cargoService.mensagem('Foto anexada ao funcionario');
      this.location.back();
    }
  }
}
