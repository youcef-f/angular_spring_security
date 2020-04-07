import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../models/movie';

// injecte "singleton" route
import { ActivatedRoute } from '@angular/router' ;

import { Router } from '@angular/router';

// required for go and back in navigation
import { Location } from '@angular/common';

import { MovieService } from '../services/business/movie.service';


@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})


export class MovieDetailComponent implements OnInit {


  @Input() movie: Movie;

  constructor(
    // all these are singleton objects, injectable, or global
    private route: ActivatedRoute,

    private router: Router,

    private movieservice: MovieService,
    private location: Location
  ) { }



  ngOnInit() {
    this.getMovieFromRoute();
  }

  getMovieFromRoute(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log( `this.route.snapshot.paramMap = ${JSON.stringify( this.route.snapshot.paramMap)}` ) ;

    this.route.params.subscribe(res => console.log('res.id: ===> ' + res.id));

    // call service to "get movie from id" from fake movie file
    // this.movieservice.getMovieFromId(id).subscribe(movie => this.movie = movie);

    // call servie to get movie from apijson server by ID
    this.movieservice.getMoviesAPIJsonById(id).subscribe(movie => {
              console.log( `movie in   getMovieFromRoute(): = ${JSON.stringify( movie)}` );
              this.movie = movie;
           }
        );

  }

  goBack(): void {
    this.location.back();
  }


  save(): void {
    console.log( 'save ------------>  ' );
    this.movieservice.updateMovie(this.movie).subscribe(() => this.goBack());
  }


  sendMeHome() {
    this.router.navigate(['']);
  }

}
