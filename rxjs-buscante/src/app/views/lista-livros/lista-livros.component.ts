import { Item, Livro, LivrosResultado } from './../../models/interfaces';
import { Component, inject, OnDestroy } from '@angular/core';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  filter,
  map,
  of,
  Subscription,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { LivroService } from 'src/app/service/livro.service';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { FormControl } from '@angular/forms';

const PAUSA = 1000;

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent implements OnDestroy {
  public listaLivros: Livro[];
  public campoBusca: FormControl = new FormControl();
  public mensagemErro: string = '';
  public livrosResultado: LivrosResultado;
  public subscription: Subscription;
  public livro: Livro;
  public termoBuscado: string;

  private livroService = inject(LivroService);

  public totalDeLivros;

  public livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(PAUSA),
    filter((valorDigitado) => valorDigitado.length >= 3),
    distinctUntilChanged(),
    switchMap((valorDigitado) => this.livroService.buscar(valorDigitado)),
    tap(({ totalItems }) => (this.totalDeLivros = totalItems)),
    map((resposta) => resposta.items ?? []),
    map((items) => this.livrosResultadoParaLivros(items)),
    catchError((err) => {
      //!capturar erros na requisição
      // this.mensagemErro = 'Ops, ocorreu um erro! Recarregue a aplicação.';
      // return EMPTY;

      console.log(err);
      return throwError(
        //! criará um Observable com a instância de erro
        () =>
          new Error(
            (this.mensagemErro =
              'Ops, ocorreu um erro! Recarregue a aplicação.')
          )
      );
    })
  );

  // buscarLivros() {
  //   this.subscription = this.livroService.buscar(this.campoBusca).subscribe({
  //     next: (value) => {
  //       this.listaLivros = this.livrosResultadoParaLivros(value);
  //     },
  //     error: (err) => {
  //       console.error(err);
  //     },
  //   });
  // }

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map((item) => new LivroVolumeInfo(item));
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
