import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  state: string = '';
  error: any;
  user = new User();

  public registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private userService: UserService, private router: Router ) { 
    this.registerForm = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.required],
    });
  }

  ngOnInit() {
  }

  addUser() {
   this.save();
   this.router.navigate(['/signin']);
  }

  private save(): void {
    console.log(this.registerForm.value);
    this.userService.addUser(this.registerForm.value)
        .subscribe();
  } 
    
}
