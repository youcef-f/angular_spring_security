import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';



@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.css']
})
export class MyDialogComponent implements OnInit {


  constructor(public matDialogRef: MatDialogRef<MyDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string) {

  }


  onCloseConfirm() {
    this.matDialogRef.close('Confirm');
  }

  onCloseCancel() {
    this.matDialogRef.close('Cancel');
  }

  ngOnInit() {
  }

}
