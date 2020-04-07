import { Component, OnInit } from '@angular/core';

import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Movie } from '../../models/movie';
import { MovieService } from '../services/business/movie.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {

  // $ signifie mode asynchrone ==> $ = "asynchrouns pipe" = asyncPipe
  movies$: Observable<Movie[]>;

  // create un object comme un stream de chaine de caraceter "string"
  // ici searchedSubject est un stream de string
  private searchedSubject = new Subject<string>();

  constructor(private movieService: MovieService) {
    // (private movieService: MovieService) ==> est un "singleton object", ou global, "injectable"
  }

  search(searchedString: string): void {
    console.log(`searchedString = ${searchedString}`);

    // ajouter une chaine string au stream
    this.searchedSubject.next(searchedString);
  }

  ngOnInit() {

    this.movies$ = this.searchedSubject.pipe(
      debounceTime(300),  // wait 300ms after each keystroke before considering the searched string
      distinctUntilChanged(),  // ignore new string if same as previous string
      switchMap((searchedString: string) => this.movieService.searchMovies(searchedString))
    );
  }

}
