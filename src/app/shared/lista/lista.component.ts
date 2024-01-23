import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Filme } from 'src/app/models/filme';
import { FilmeService } from 'src/app/service/filme.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  filmes: Filme[] = [];
  valorInput: string = "";
  tipoLista: string = "";
  page: number = 1;
  caminho: string = "";

  constructor(private filmeService: FilmeService, private route: ActivatedRoute, private router: Router) {

  }


  ngOnInit(): void {
    this.CarregarFilmes();
  }

  private CarregarFilmes() {

    this.route.paramMap.subscribe((params) => {
      const tipo = params.get('tipo');
      const pagina = params.get('pagina')!;
      this.page = Number(pagina);

      if (tipo == "emAlta") {
        this.GerarListaEmAlta(this.page.toString());

      } else if (tipo == "melhores") {
        this.GerarListaMelhores(this.page.toString());
      }
      else {
        this.Pesquisar(tipo);

      }

    });
  }

  Pesquisar(tipo: string | null): any {

    this.tipoLista = "Resultados para: " + tipo,

    this.filmeService.Pesquisar(tipo, this.page.toString()).subscribe((filmes) => {

      this.filmes = filmes;

    });
  }

  GerarListaMelhores(pagina: string): any {
    this.tipoLista = "Melhores Filmes",
      this.caminho = "melhores",
    this.filmeService.PesquisarListaMelhores(pagina).subscribe((filmes) => {
      this.filmes = filmes;

    });
  }

  GerarListaEmAlta(pagina: string): any {
    this.tipoLista = "Filmes em Alta!"
    this.caminho = "emAlta",
    this.filmeService.PesquisarListaEmAlta(pagina).subscribe((filmes) => {
      this.filmes = filmes;

    });

  }

  CarregarPagina(paginaAlterada: number) {
    this.page = (paginaAlterada),
      this.CarregarFilmes()

    this.router.navigate(["/view/home", this.caminho, paginaAlterada])
  }

}
