import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public isloggedIn: boolean;
  public subscription;
  constructor(private userService: UserService, private router: Router) {
    
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/sign-in']);
  }
  ngOnInit() {
  }

  ngDestroy() {
    this.subscription.unsubscribe();
  }

}
