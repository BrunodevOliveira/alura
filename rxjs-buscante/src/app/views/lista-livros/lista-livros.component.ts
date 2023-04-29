import { Livro } from './../../models/interfaces';
import { Component, inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent implements OnDestroy {
  public listaLivros: Livro[];
  public campoBusca: string = '';
  public subscription: Subscription;
  public livro: Livro;

  private livroService = inject(LivroService);

  buscarLivros() {
    this.subscription = this.livroService.buscar(this.campoBusca).subscribe({
      next: (value) => {
        this.listaLivros = this.livrosResultadoParaLivros(value);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  livrosResultadoParaLivros(items): Livro[] {
    const livros: Livro[] = [];

    items.forEach((item) => {
      livros.push(
        (this.livro = {
          title: item.volumeInfo?.title,
          authors: item.volumeInfo?.authors,
          publisher: item.volumeInfo?.publisher,
          publishedDate: item.volumeInfo?.publishedDate,
          description: item.volumeInfo?.description,
          previewLink: item.volumeInfo?.previewLink,
          thumbnail: item.volumeInfo?.imageLinks?.thumbnail,
        })
      );
    });
    return livros;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
