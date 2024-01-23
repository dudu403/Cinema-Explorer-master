import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})

export class FavoritosService {

    private chaveLocalStorage = 'filmesFavoritos';

    constructor(private toastService: ToastrService) { }

    adicionarFavorito(filme: any) {

        const favoritos = this.obterFavoritos();


        if (!this.isFilmeFavorito(filme)) {
            favoritos.push(filme);

            this.toastService.success("'" + filme.nomePt + "' foi salvo nos favoritos com sucesso!", 'Favorito!');
            localStorage.setItem(this.chaveLocalStorage, JSON.stringify(favoritos));
        }
    }

    removerFavorito(filme: any) {
        const favoritos = this.obterFavoritos();
    
        const index = favoritos.findIndex((fav) => fav.id === filme.id);
        if (index !== -1) {
            favoritos.splice(index, 1);
    
            this.toastService.info("'" + filme.nomePt + "' foi removido dos favoritos com!", 'Removido!', {
                positionClass: 'toast-top-right'
            });
    
            localStorage.setItem(this.chaveLocalStorage, JSON.stringify(favoritos));
        }
    }

    listarFavoritos() {

        return this.obterFavoritos();
    }

    isFilmeFavorito(filme: any): boolean {

        const favoritos = this.obterFavoritos();
        return favoritos.some((fav) => fav.id === filme.id);
    }

    private obterFavoritos(): any[] {

        const favoritos = localStorage.getItem(this.chaveLocalStorage);
        return favoritos ? JSON.parse(favoritos) : [];
    }

}