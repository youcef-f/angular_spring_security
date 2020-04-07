import { Injectable } from '@angular/core';
import { fakeMovies } from '../../fake-movies';
import { Movie } from '../../../models/movie' ;

import { Observable, of } from 'rxjs';

import { MessageService } from './message.service';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


  // variable global
  const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private moviesURL = 'http://localhost:3000/movies';

  private moviesURLid = 'http://localhost:3000/movies';


  // ///////////////////////////////////////////////////////////////////////
  // ///////////////////////////////////////////////////////////////////////
 // /    LECTURE LOCAL DEPUIS FICHIER JSON   /////////////////////////////
  // revoi une fake tableau de "movie" depuis la variable "fakeMovie" dans le fichier fake-movies
  // n'utilise pas Observable. Lecture direct du fichier db.json
  getMovies(): Movie[] {
       this.messageservice.add( `${  new Date().toLocaleString()}. Get movies list in getMovies()`);
     return fakeMovies ;
  }

  // revoi une fake tableau de "movie" depuis la variable "fakeMovie" dans le fichier fake-movies
  // utilise le mode observable. Lecture direct du fichier db.json
  getMoviesRxjs(): Observable<Movie[]> {

      this.messageservice.add( `${  new Date().toLocaleString()}. Get movies list in getMoviesRxj())`);
      return of(fakeMovies );
  }

  // Lecture direct du fichier db.json
  getMovieFromId(id: number): Observable<Movie> {
      return of(fakeMovies.find(movie => movie.id === id));
  }

  // ///////////////////////////////////////////////////////////////////////
  // ///////////////////////////////////////////////////////////////////////
  ///    API DEPUIS SERVER JSON ////////////////////////////////////////////

  // revoi une fake tableau de tous "movie" depuis le json server
  getMoviesAPIJson(): Observable<Movie[]> {


          //   const params = new HttpParams();
          //   if (id) {
          //     params.set('start', from);
          // }
            return this.http.get<Movie[]>(this.moviesURL).pipe(
              tap(receivedMovies => console.log(`receivedMovies = ${JSON.stringify(receivedMovies)}`)),
              // failed
              catchError(error => of([]))
            );
  }


  // revoi un seul "movie" depuis le json server defini par son ID
  getMoviesAPIJsonById(id: number): Observable<Movie> {

      // construire l'url pour acceder aux détails de l'élément par son ID
       const movieIDURL = this.moviesURL + '/' + id;

       // ou autre syntaxe de declaration de la constante  movieIDURL qui n'est pas utlisé
       // const movieIDURLx = `${this.moviesURL}/${id}`;

      return this.http.get<Movie>(movieIDURL).pipe(
         // sucess
         tap(selecedMovie => console.log(`selecedMovie = ${JSON.stringify(selecedMovie)}`)),
         // failed
         catchError(error => of(new Movie))
       );
  }



 /** PUT: update the movie on the server */
 // retourne any volontairement pour gerer les eventuelles erreurs qui ont leur propre type différent Movie
 updateMovie(movie: Movie):  Observable<any> {

      return this.http.put(`${this.moviesURL}/${movie.id}`, movie, httpOptions).pipe(
        // sucess
        tap(updatedMovie => console.log(`updatedMovie = ${JSON.stringify(updatedMovie)}`)),
      // failed
        catchError(error => of(new Movie))
       ) ;
 }


  /** POST: add a new movie to the server */
  // retourne any volontairement pour gerer les eventuelles erreurs qui ont leur propre type différent Movie
  addMovie(newMovie: Movie):  Observable<Movie> {

      return this.http.post<Movie>(`${this.moviesURL}`, newMovie, httpOptions).pipe(
        // sucess
        tap(addedMovie => console.log(`addedMovie = ${JSON.stringify(addedMovie)}`)),
      // failed
      catchError(error => of(new Movie))
    ) ;
  }


  /** DELETE: delete the movie from the server */
  // retourne any volontairement pour gerer les eventuelles erreurs qui ont leur propre type différent Movie
  deleteMovie(movieId: Number):  Observable<Movie> {

          return this.http.delete<Movie>(`${this.moviesURL}/${movieId}`, httpOptions).pipe(
            // sucess
            tap(deteledMovie => console.log(`delete movie by id = ${JSON.stringify(deteledMovie)}`)),
          // failed
          catchError(error => of(new Movie))
        ) ;
  }


  /* GET movies whose name contains searched string */
  searchMovies(typedString: string): Observable<Movie[]> {
    // si la chaine et vide renvoi une erreur.
    if (!typedString.trim()) {
       return of([]);
    }

    // name_like => the field name contains any string "typedString" depdending creterias.
    return this.http.get<Movie[]>(`${this.moviesURL}?name_like=${typedString}`).pipe(
         tap(foundedMovies => console.log(`founded movies = ${JSON.stringify(foundedMovies)}`)),
         catchError(error => of(null))
      );
  }




  constructor(
    private http: HttpClient,
    public messageservice: MessageService) {
  }

}
