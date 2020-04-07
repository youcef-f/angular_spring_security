import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieService } from '../services/business/movie.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // receive four top movies
  movies: Movie[] = [];

  constructor(private movieservice: MovieService) { }

  ngOnInit() {
   // this.getMovies();

    this.getMoviesAPI();
  }

  getMovies(): void {
// show only the four top  movies.
    this.movieservice.getMoviesRxjs().subscribe(movies => this.movies = movies.slice(1, 5));
  }


  getMoviesAPI(): void {
    // show only the four top  movies.
        this.movieservice.getMoviesAPIJson().subscribe(movies => this.movies = movies.slice(1, 5));
  }




}
