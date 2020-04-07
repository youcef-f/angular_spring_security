import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
// import { fakeMovies } from '../fake-movies';

import { MovieService } from '../services/business/movie.service';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})


export class MoviesComponent implements OnInit {

  // movie: Movie = {
  //   id: 1,
  //   name: 'Star Wars',
  //   releaseYear: 1977
  // };


 // Action when select a Movie in List item
  selectedMovie: Movie;


 // movies = fakeMovies;
  private movies: Movie[] ;

  constructor( private movieservice: MovieService) {
   }



   getMoviesFormServices(): void {
         this.movies = this.movieservice.getMovies();
   }



   // rxjs mode asynchrone
   getMoviesFormServicesRxjs(): void {
       // updateMovie est une variable quelquconque interne à subscribe qui lui est affecté le retour de la fonction
       // getMoviesRxjs()
       this.movieservice.getMoviesRxjs().subscribe (updatedMovies => this.movies = updatedMovies);
       console.log(`this.movies = ${JSON.stringify(this.movies)}`);
   }


   // rxjs mode asynchrone
   getMoviesFormServicesAPI(): void {
    // updateMovie est une variable quelquconque interne à subscribe qui lui est affecté le retour de la fonction
    // getMoviesRxjs()
    this.movieservice.getMoviesAPIJson().subscribe (updatedMovies => this.movies = updatedMovies);
    console.log(`this.movies = ${JSON.stringify(this.movies)}`);
}



  ngOnInit() {
    // getMoviesFormServices peut potentiellement bloqués le browser
    // this.getMoviesFormServices() ;

    // getMoviesFormServicesRxjs ne bloque pas le browser car elle est asynchrone
    // this.getMoviesFormServicesRxjs();

    // getMoviesFormServicesAPI fait appelle à json server
    this.getMoviesFormServicesAPI();

  }



  add(name: String, releaseYear: String): void {
    name = name.trim();
    if ( Number.isNaN(Number(releaseYear)) || !name || Number(releaseYear) === 0 ) {
      alert('Name must not be blank, Release year must be a number');
      return  ;
    }

    const newMovie: Movie = new Movie() ;
    newMovie.name = name ;
    newMovie.releaseYear = Number(releaseYear);
    this.movieservice.addMovie(newMovie).subscribe(insertedMovie => {
      this.movies.push(insertedMovie) ;
    });
  }




  delete(movieId: Number): void {
    this.movieservice.deleteMovie(movieId).subscribe( _ => {
         this.movies = this.movies.filter(forEachMovie => forEachMovie.id !== movieId);
     }
    );
  }


}




