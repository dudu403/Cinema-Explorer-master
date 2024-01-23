import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Filme } from 'src/app/models/filme';
import { FilmeService } from 'src/app/service/filme.service';

@Component({
  selector: 'app-artista-detalhes',
  templateUrl: './artista-detalhes.component.html',
  styleUrls: ['./artista-detalhes.component.css']
})
export class ArtistaDetalhesComponent implements OnInit {

  filmes: Filme[] = [];
  images: string[] = [];

  @Input() artista: any = {
    id: 0,
    nome: '',
    posterUrl: '',

  };

  constructor(private filmeService: FilmeService, private route: ActivatedRoute) {


  }
  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id') as string;

    this.filmeService.pesquisarArtistaPorId(id).subscribe((artista) => {
      this.artista = artista;

    });
    this.filmeService.PesquisarFilmografia(id).subscribe((filmes) => {
      this.filmes = filmes;


    });
    this.filmeService.PesquisarImagensArtista(id).subscribe((images) => {
      this.images = images;

    });


  }

}
