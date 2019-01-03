import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  //public user$ = this.userService.user;
  user = new User() ;
  public form: FormGroup;
  public subcription;
  public errorLogin: string;
  private isLoginError = false;
  isAuthenticated = false;
  
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router ) { 
    this.form = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.required],
    });
  }

 ngOnInit() {
 }
  
getUser(){
     this.subcription =  this.userService.login(this.form.value.email)
      .subscribe(
        user => {
                  console.log(user);
                  this.user = user
                 }
      );
}
 login(form:any){
       this.isLoginError = false;
       this.getUser();
       this.loginUser();
    }
    
loginUser(){
    if(this.form.value.email == this.user.email && this.form.value.password == this.user.password){
           this.isAuthenticated = true;
           this.router.navigate(['/profiles']);
       }else {
         //  this.isLoginError = true;
           this.isAuthenticated = false;
       }
}
    
 signUp() {
    this.router.navigate(['/signup']);
  }
    
  ngDestroy(){
    this.subcription.unsubscribe();
  }
}

