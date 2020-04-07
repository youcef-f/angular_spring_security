import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-snackbar-demo',
  templateUrl: './snackbar-demo.component.html',
  styleUrls: ['./snackbar-demo.component.css']
})
export class SnackbarDemoComponent implements OnInit {

  constructor(public matsnackbar: MatSnackBar) { }

  ngOnInit() {
  }


  openSnackbar() {
    this.matsnackbar.open('this is snack bar message!', 'Go it!') ;

  }

}
