import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Filme } from 'src/app/models/filme';
import { FavoritosService } from 'src/app/service/favoritos.service';
import { FilmeService } from 'src/app/service/filme.service';

@Component({
  selector: 'app-filme-detalhes',
  templateUrl: './filme-detalhes.component.html',
  styleUrls: ['./filme-detalhes.component.css']
})
export class FilmeDetalhesComponent implements OnInit {

  @Input() filme: any = {
    id: 0,
    nomePt: '',
    nomeOriginal: '',
    generos: [],
    sinopse: '',
    posterUrl: '',
    videoUrl: '',
    anoLancamento: '',
    diretor: '',
    elenco: [],
  };

  favorito: boolean = false;


  constructor(private filmeService: FilmeService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private favoritoService: FavoritosService, private toastService: ToastrService) {


  }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id') as string;

    this.filmeService.pesquisarPorId(id).subscribe((filme) => {
      this.filme = filme;
      this.favorito = this.favoritoService.isFilmeFavorito(this.filme);

    });

    this.filmeService.pesquisarVideo(id).subscribe((video) => {
      this.filme.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://www.youtube.com/embed/' + video.key);


    });
    this.filmeService.pesquisarDiretor(id).subscribe((diretor) => {
      this.filme.diretor = diretor;


    });
    this.filmeService.pesquisarElenco(id).subscribe((elenco) => {
      this.filme.elenco = elenco;


    });

  }

  adicionarAosFavoritos(filme: Filme) {
    this.favoritoService.adicionarFavorito(filme);
    this.favorito = true;
    this.salvarFavoritosNoLocalStorage();
    
  }

  removerDosFavoritos(filme: Filme) {
    this.favoritoService.removerFavorito(filme);
    this.favorito = false;
    this.salvarFavoritosNoLocalStorage();
  }

  toggleFavorito(filme: Filme) {
    if (this.favoritoService.isFilmeFavorito(filme)) {
      this.favoritoService.removerFavorito(filme);
    } else {
      this.favoritoService.adicionarFavorito(filme);
    }


    this.favorito = this.favoritoService.isFilmeFavorito(filme);


    this.salvarFavoritosNoLocalStorage();
  }

  private salvarFavoritosNoLocalStorage() {
    const favoritos = this.favoritoService.listarFavoritos();
    localStorage.setItem('filmesFavoritos', JSON.stringify(favoritos));



  }

}
