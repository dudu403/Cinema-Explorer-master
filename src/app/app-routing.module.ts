import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './shared/lista/lista.component';
import { CardFilmeComponent } from './shared/card-filme/card-filme.component';
import { HomeComponent } from './view/home/home.component';
import { FilmeDetalhesComponent } from './view/filme-detalhes/filme-detalhes.component';
import { ArtistaDetalhesComponent } from './view/artista-detalhes/artista-detalhes.component';
import { FavoritosComponent } from './view/favoritos/favoritos.component';


const routes: Routes = [

  {
    path: '',
    redirectTo: 'view/home/melhores/1',
    pathMatch: 'full',
  },
  {
    path: 'view/home/:tipo/:pagina',
    component: HomeComponent,
  },
  {
    path: 'view/filme-detalhes/:id',
    component: FilmeDetalhesComponent,
  },
  {
    path: 'view/artista-detalhes/:id',
    component: ArtistaDetalhesComponent,
  },
  {
    path: 'view/favoritos',
    component: FavoritosComponent,
  },

  {
    path: 'shared/lista',
    component: ListaComponent,
  },

  {
    path: 'shared/card-filme',
    component: CardFilmeComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
