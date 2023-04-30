import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { LivrosResultado, Item } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  private readonly API = 'https://www.googleapis.com/books/v1/volumes';
  constructor(private http: HttpClient) {}

  buscar(valorDigitado: string): Observable<LivrosResultado> {
    const params: HttpParams = new HttpParams().append('q', valorDigitado);
    return this.http.get<LivrosResultado>(this.API, { params });
    // .pipe(
    //   tap(console.log), //* Não modifica os dados, serve para visualizá-los e gerar algum efeito colateral
    //   map((resposta) => resposta.items ?? [])
    // );
  }
}
