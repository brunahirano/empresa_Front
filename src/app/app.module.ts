import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyPipe, registerLocaleData } from '@angular/common';//usar pipe dinheiro br
import localePt from '@angular/common/locales/pt' //para usar pipe de moeda

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroCargoComponent } from './views/cargo/cadastro-cargo/cadastro-cargo.component';
import { EdicaoCargoComponent } from './views/cargo/edicao-cargo/edicao-cargo.component';
import { ExclusaoCargoComponent } from './views/cargo/exclusao-cargo/exclusao-cargo.component';
import { HeaderComponent } from './Template/header/header.component';
import { HomeComponent } from './Template/home/home.component';
import { ListaCargoComponent } from './views/cargo/lista-cargo/lista-cargo.component';
import { CadastroFuncComponent } from './views/funcionario/cadastro-func/cadastro-func.component';
import { ListaFuncDoCargoComponent } from './views/funcionario/lista-func-do-cargo/lista-func-do-cargo.component';
import { ExclusaoFuncComponent } from './views/funcionario/exclusao-func/exclusao-func.component';
import { EdicaoFuncComponent } from './views/funcionario/edicao-func/edicao-func.component';
import { ListaFuncComCargoComponent } from './views/funcionario/lista-func-com-cargo/lista-func-com-cargo.component';
import { MentorDoCargoComponent } from './views/mentor/mentor-do-cargo/mentor-do-cargo.component';
import { ListaMentorComCargoComponent } from './views/mentor/lista-mentor-com-cargo/lista-mentor-com-cargo.component';
import { AtribuirCargoComponent } from './views/funcionario/atribuir-cargo/atribuir-cargo.component';
import { CadastrarMentorComponent } from './views/mentor/cadastrar-mentor/cadastrar-mentor.component';
import { AtribuirCargoAoMentorComponent } from './views/mentor/atribuir-cargo-ao-mentor/atribuir-cargo-ao-mentor.component';
import { EdicaoMentorComponent } from './views/mentor/edicao-mentor/edicao-mentor.component';
import { ExclusaoMentorComponent } from './views/mentor/exclusao-mentor/exclusao-mentor.component';
import { CadastrarBoletoComponent } from './views/boleto-medico/cadastrar-boleto/cadastrar-boleto.component';
import { EdicaoBoletoComponent } from './views/boleto-medico/edicao-boleto/edicao-boleto.component';
import { ListaBoletosFuncComponent } from './views/boleto-medico/lista-boletos-func/lista-boletos-func.component';
import { ExclusaoBoletoComponent } from './views/boleto-medico/exclusao-boleto/exclusao-boleto.component';


//IMPORTS MATERIAL
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';

//Componentes do Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


import { NgxCurrencyModule } from 'ngx-currency';
import { LoginComponent } from './Template/login/login.component';

registerLocaleData(localePt)


@NgModule({
  declarations: [
    AppComponent,
    CadastroCargoComponent,
    EdicaoCargoComponent,
    ExclusaoCargoComponent,
    HeaderComponent,
    HomeComponent,
    ListaCargoComponent,
    CadastroFuncComponent,
    ListaFuncDoCargoComponent,
    ExclusaoFuncComponent,
    EdicaoFuncComponent,
    ListaFuncComCargoComponent,
    MentorDoCargoComponent,
    ListaMentorComCargoComponent,
    AtribuirCargoComponent,
    AtribuirCargoAoMentorComponent,
    CadastrarMentorComponent,
    EdicaoMentorComponent,
    ExclusaoMentorComponent,
    CadastrarBoletoComponent,
    EdicaoBoletoComponent,
    ListaBoletosFuncComponent,
    ExclusaoBoletoComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatSnackBarModule,
    NgbModule,
    NgbModalModule,
    NgxCurrencyModule,
    MatMenuModule
  ],
  providers: [{provide:LOCALE_ID, useValue:"pt-BR"},{provide: DEFAULT_CURRENCY_CODE,useValue:"BRL"}, CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
