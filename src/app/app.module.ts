import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './view/home/home.component';
import { ListaComponent } from './shared/lista/lista.component';

import { CardFilmeComponent } from './shared/card-filme/card-filme.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilmeDetalhesComponent } from './view/filme-detalhes/filme-detalhes.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ArtistaDetalhesComponent } from './view/artista-detalhes/artista-detalhes.component';
import { FavoritosComponent } from './view/favoritos/favoritos.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListaComponent,
    CardFilmeComponent,
    FilmeDetalhesComponent,
    NavbarComponent,
    ArtistaDetalhesComponent,
    FavoritosComponent,


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
