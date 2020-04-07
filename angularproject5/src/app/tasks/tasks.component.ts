import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/infra/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: any ;
  constructor(public authenticationService: AuthenticationService, private router: Router) { }


  ngOnInit() {

     this.authenticationService.getTasks().subscribe(
      springTasksResponse => {
        console.log('ngoninit   tasks getitem');
        this.tasks = springTasksResponse ;
      } ,
      springTasksError => {

        console.log('ngoninit   tasks error');
        this.authenticationService.logout();
        this.router.navigateByUrl('/login');
      }
     );
  }



  onNewTask() {
    this.router.navigateByUrl('/new-task') ;
  }

}
