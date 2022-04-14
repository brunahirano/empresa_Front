import { LoginComponent } from './Template/login/login.component';
import { ExclusaoBoletoComponent } from './views/boleto-medico/exclusao-boleto/exclusao-boleto.component';
import { EdicaoBoletoComponent } from './views/boleto-medico/edicao-boleto/edicao-boleto.component';
import { ListaBoletosFuncComponent } from './views/boleto-medico/lista-boletos-func/lista-boletos-func.component';
import { EdicaoMentorComponent } from './views/mentor/edicao-mentor/edicao-mentor.component';
import { ExclusaoMentorComponent } from './views/mentor/exclusao-mentor/exclusao-mentor.component';
import { AtribuirCargoAoMentorComponent } from './views/mentor/atribuir-cargo-ao-mentor/atribuir-cargo-ao-mentor.component';
import { CadastrarMentorComponent } from './views/mentor/cadastrar-mentor/cadastrar-mentor.component';
import { AtribuirCargoComponent } from './views/funcionario/atribuir-cargo/atribuir-cargo.component';
import { ListaFuncComCargoComponent } from './views/funcionario/lista-func-com-cargo/lista-func-com-cargo.component';
import { MentorDoCargoComponent } from './views/mentor/mentor-do-cargo/mentor-do-cargo.component';
import { ListaMentorComCargoComponent } from './views/mentor/lista-mentor-com-cargo/lista-mentor-com-cargo.component';
import { EdicaoFuncComponent } from './views/funcionario/edicao-func/edicao-func.component';
import { ExclusaoFuncComponent } from './views/funcionario/exclusao-func/exclusao-func.component';
import { CadastroFuncComponent } from './views/funcionario/cadastro-func/cadastro-func.component';
import { ListaFuncDoCargoComponent } from './views/funcionario/lista-func-do-cargo/lista-func-do-cargo.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EdicaoCargoComponent } from './views/cargo/edicao-cargo/edicao-cargo.component';
import { ExclusaoCargoComponent } from './views/cargo/exclusao-cargo/exclusao-cargo.component';
import { CadastroCargoComponent } from './views/cargo/cadastro-cargo/cadastro-cargo.component';
import { ListaCargoComponent } from './views/cargo/lista-cargo/lista-cargo.component';
import { HomeComponent } from './Template/home/home.component';
import { CadastrarBoletoComponent } from './views/boleto-medico/cadastrar-boleto/cadastrar-boleto.component';


const routes: Routes = [
  {path: "", redirectTo: "/login", pathMatch: "full"},
  {path: "login", component: LoginComponent},
  {path:"home", component:HomeComponent},
  // Rotas do cargo
  {path:"cargo/lista", component: ListaCargoComponent},
  {path:"cargo/cadastroCargo", component:CadastroCargoComponent},
  {path:"cargo/exclusaoCargo/:id", component:ExclusaoCargoComponent},
  {path:"cargo/edicaoCargo/:id", component: EdicaoCargoComponent},
  // Rotas do funcionário
  {path:"funcionario/listaFuncDoCargo/:id_cargo", component: ListaFuncDoCargoComponent},
  {path:"funcionario/cadastrar", component: CadastroFuncComponent},
  {path: "funcionario/lista", component: ListaFuncComCargoComponent},
  {path: "funcionario/exclusao/:id_funcionario", component: ExclusaoFuncComponent},
  {path: "funcionario/edicao/:id_funcionario/:id_cargo", component: EdicaoFuncComponent},
  {path: "funcionario/funcComCargo", component: ListaFuncComCargoComponent},
  {path:"funcionario/atribuirCargo/:id_funcionario/:id_cargo", component:AtribuirCargoComponent},
  // Rotas do mentor
  {path: "mentor/mentorCargo/:id_cargo", component: MentorDoCargoComponent},
  {path: "mentor/mentorComCargo", component:ListaMentorComCargoComponent},
  {path: "mentor/cadastrar", component: CadastrarMentorComponent},
  {path: "mentor/atribuirCargo/:id_mentor/:id_cargo", component: AtribuirCargoAoMentorComponent},
  {path: "mentor/exclusao/:id_mentor", component: ExclusaoMentorComponent},
  {path: "mentor/edicao/:id_mentor/:id_cargo", component:EdicaoMentorComponent},
  // Rotas do boleto
  {path:"funcionario/boleto/:id_funcionario", component: ListaBoletosFuncComponent},
  {path: "funcionario/boleto/cadastrar/:id_funcionario",component:CadastrarBoletoComponent},
  {path: "funcionario/boleto/edicao/:codigo/:id_funcionario", component: EdicaoBoletoComponent},
  {path: "funcionario/boleto/exclusao/:codigo/:id_funcionario", component: ExclusaoBoletoComponent}
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
