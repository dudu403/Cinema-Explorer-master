import { BehaviorSubject, Observable, filter, map, tap } from "rxjs";
import { Filme } from "../models/filme";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Artista } from "../models/artista";


@Injectable({
    providedIn: 'root',
})

export class FilmeService {



    chave = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjYzMTRmODdjYzAzZWIzOGQ5M2FlNzNhN2EwODVlYSIsInN1YiI6IjY0Zjc3OTFlNGNjYzUwMDEzODhjZjMyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KVSgGIzzpgGgi7p12FG2DBh8yT76qWE8_ITI8L6UBdw';


    constructor(private http: HttpClient) {

    }

    Pesquisar(tipo: string | null,page:string): Observable<Filme[]> {
        const url = 'https://api.themoviedb.org/3/search/movie?query=' + tipo + '&include_adult=true&language=pt-BR&page='+page;

        console.log(tipo)
        return this.http.get<any>(url, this.obterHeaderAutorizacao()).pipe(
            map(res => res.results),

            map(objetos => this.mapearLista(objetos)),


        );
    }

    PesquisarImagensArtista(id: string): Observable<string[]> {
        const url = 'https://api.themoviedb.org/3/person/' + id + '/images';

        return this.http.get<any>(url, this.obterHeaderAutorizacao()).pipe(
            map(res => res.profiles),
            map(profiles => profiles.slice(0, 10)),
            map((profiles: any[]) => profiles.map((profile: any) => "https://image.tmdb.org/t/p/original" + profile.file_path)),
            tap(o => console.log(o))
        );
    }



    pesquisarArtistaPorId(id: string) {

        const url = 'https://api.themoviedb.org/3/person/' + id + '?language=pt-BR';


        return this.http.get<any>(url, this.obterHeaderAutorizacao()).pipe(

            map(obj => this.MapearArtista(obj)),

        );

    }

    MapearArtista(obj: any): Artista {

        return {
            id: obj.id,
            nome: obj.name,
            posterUrl: "https://image.tmdb.org/t/p/original/" + obj.profile_path,
            biografia: obj.biography,

        }
    }

    PesquisarFilmografia(id: string) {
        const url = 'https://api.themoviedb.org/3/person/' + id + '/movie_credits?language=pt-BR';



        return this.http.get<any>(url, this.obterHeaderAutorizacao()).pipe(
            map(res => res.cast),
            tap(obj => console.log(obj)),
            map(items => items.sort((a: any, b: any) => b.vote_count - a.vote_count)),
            map(objetos => this.mapearLista(objetos)),


        );
    }



    PesquisarListaEmAlta(pagina: string): Observable<Filme[]> {

        console.log(pagina);
        const url = 'https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=' + pagina;

        return this.http.get<any>(url, this.obterHeaderAutorizacao()).pipe(
            map(res => res.results),
            map(objetos => this.mapearLista(objetos)),

        );

    }

    PesquisarListaMelhores(pagina: string): Observable<Filme[]> {
        const url = 'https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=' + pagina;

        return this.http.get<any>(url, this.obterHeaderAutorizacao()).pipe(
            map(res => res.results),
            map(objetos => this.mapearLista(objetos)),


        );
    }

    pesquisarPorId(id: string): Observable<Filme> {
        const url = 'https://api.themoviedb.org/3/movie/' + id + '?language=pt-BR';

        return this.http.get<any>(url, this.obterHeaderAutorizacao()).pipe(

            map(obj => this.mapearFilme(obj)),

        );
    }

    private obterHeaderAutorizacao() {

        return {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${this.chave}`,
            },
        }
    }


    mapearLista(obj: any[]): Filme[] {
        return obj
            .filter(item => item.poster_path !== null)
            .map(item => {
                const data = item.release_date.split('-')[0];
                return {
                    id: item.id,
                    nomePt: item.title,
                    nomeOriginal: item.original_title,
                    generos: ['', ''],
                    sinopse: item.overview,
                    posterUrl: "https://image.tmdb.org/t/p/original/" + item.poster_path,
                    videoUrl: "https://www.youtube.com/embed/",
                    anoLancamento: data,
                    elenco: []
                };
            });
    }




    mapearFilme(obj: any): Filme {

        const nomesDosGeneros = obj.genres.map((genero: any) => genero.name);
        const data = obj.release_date.split('-')[0];


        return {
            id: obj.id,
            nomePt: obj.title,
            nomeOriginal: obj.original_title,
            generos: nomesDosGeneros,
            sinopse: obj.overview,
            posterUrl: "https://image.tmdb.org/t/p/original/" + obj.poster_path,
            videoUrl: "https://www.youtube.com/embed/",
            anoLancamento: data,

            elenco: []
        }
    }



    pesquisarDiretor(id: any): Observable<Artista> {
        const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=pt-BR`;

        return this.http.get<any>(url, this.obterHeaderAutorizacao()).pipe(
            map(res => res.crew),
            map(obj => this.mapearDiretor(obj)),

        );


    }

    pesquisarElenco(id: any): Observable<Artista> {
        const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=pt-BR`;

        return this.http.get<any>(url, this.obterHeaderAutorizacao()).pipe(
            map(res => res.cast),
            map(artistas => artistas.slice(0, 12)),
        );
    }

    pesquisarVideo(id: any): Observable<any> {
        const url = 'https://api.themoviedb.org/3/movie/' + id + '/videos?language=en-US';

        return this.http.get<any>(url, this.obterHeaderAutorizacao()).pipe(
            map(obj => obj.results),
            map(obj => this.mapearTrailer(obj)),

        );

    }

    mapearTrailer(obj: any[]): string {
        return obj.find(v => v.type === "Trailer") as string;

    }


    mapearDiretor(obj: any[]): Artista {
        return obj.find(d => d.job === "Director") as Artista;

    }

}
