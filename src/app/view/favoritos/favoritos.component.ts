import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FavoritosService } from 'src/app/service/favoritos.service';

@Component({
  selector: 'app-filme-favorito',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  filmesFavoritos: any[] = [];

  constructor(private favoritoService: FavoritosService, private toastService: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.filmesFavoritos = this.favoritoService.listarFavoritos();
    if (this.filmesFavoritos.length == 0) this.MostrarMensagem();
  }
  MostrarMensagem() {
    this.toastService.info('Nenhum filme salvo como favorito!', 'Lista Vazia');
    this.router.navigate(['view/home/melhores/1']);
  }

  removerDosFavoritos(filme: any) {

    this.favoritoService.removerFavorito(filme);

    this.filmesFavoritos = this.favoritoService.listarFavoritos();

  }
}
