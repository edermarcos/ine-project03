import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  backupBooks: Book[] = [];
  books: Book[] = [];
  inputSearch: string = '';

  constructor(private http: HttpClient) {
    this.getBooks();
  }

  ngOnInit(): void {
  }

  handleSearch(): void {
    this.books = this.backupBooks.filter(book => book.titulo.includes(this.inputSearch));
  }

  resetSearch(): void {
    this.inputSearch = '';
    this.books = this.backupBooks;
  }

  getBooks(): void {
    this.http.get<Book[]>('/assets/books.json').subscribe(data => {
      this.backupBooks = data;
      this.books = data;
    });
  }
}

export interface Book {
  id: number;
  titulo: string;
  autor: string;
  editorial: string;
  descripcion: string;
  imagen: string;
}
