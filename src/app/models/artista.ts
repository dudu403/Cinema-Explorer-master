export class Artista {
    id: number;
    nome: string;
    posterUrl: string | undefined
    biografia: string | undefined


    constructor(id: number, nome: string) {
        this.id = id
        this.nome = nome

    }
}