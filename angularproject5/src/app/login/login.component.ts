import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../services/infra/auth.service';

import { MatSidenav } from '@angular/material/sidenav';

import { MainNavComponent } from '../main-nav/main-nav.component';
import { AuthenticationService } from '../services/infra/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  loading = false;
  returnUrl: string;

  username: string;
  password: string;


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private activateroute: ActivatedRoute,
    private auth: AuthService,
    private mainnav: MainNavComponent,
    private autenticationService: AuthenticationService
  ) {
  }



  // convenience getter for easy access to form fields
  public get f() { return this.loginForm.controls; }




  ngOnInit() {


    // toggle main nav side
    this.mainnav.togglenavbar = false;

    // get return url from route parameters or default to '/'
    this.returnUrl = this.activateroute.snapshot.queryParams['returnUrl'] || '/';


    // initiation du forme
    this.
      loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]
          // lastName: ['', Validators.required],
          //  email: ['', [Validators.required, Validators.email]],
        ]
      });
  }



  login() {


    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      console.log('invalide form login');
      return;
    }

    this.loading = true;

    if (this.loginForm.valid) {
      alert('SUCCESS!! :-)');
      this.auth.sendToken(this.loginForm.value.username);
      // this.route.navigate(['button']);
      this.router.navigate([this.returnUrl]);

      // show main nav bar
      // this.mainnav.togglenavbar = true;

    }


  }



  /* username: string;
   password: string;

   login(): void {
     if (this.username === 'admin' && this.password === 'admin') {
       this.router.navigate(['dashboard']);
     } else {
       alert('Invalid credentials');
     }
   }

   ngOnInit() {
   }

   */


   // //////////////////////////////////////////////////////////////////////:

   mode = 0;
  // constructor(private autenticationService: AuthenticationService, private router: Router) { }
 
  
   onLogin(formUserLogin): void {
 
     console.log(`formuserLogin in login.component ' + ${JSON.stringify(formUserLogin)}`);
     //  {"username":"username","password":"password"}
 
     this.autenticationService.login(formUserLogin).subscribe(
 
       springUserLoginResponse => {
 
         // console.log(`+++++ jwt : =   ${JSON.stringify(springUserLoginResponse)}`);
         console.log('+++++ jwt = ' +  springUserLoginResponse);
         console.log('********   Authorization' + springUserLoginResponse.headers.get('Authorization'));
         const jwtToken = springUserLoginResponse.headers.get('Authorization');
 
         this.autenticationService.deleteToken();
         this.autenticationService.saveToken(jwtToken);
 
         this.router.navigateByUrl('/tasks');
       },
       springUserLoginError => {
          this.mode = 1;
        }
 
     );
   }
 
}
