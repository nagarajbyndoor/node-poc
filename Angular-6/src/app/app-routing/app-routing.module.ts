import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { AddProfileComponent } from '../add-profile/add-profile.component';
import { ProfileDetailsComponent } from '../profile-details/profile-details.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { ContactComponent } from '../contact/contact.component';
import { AboutComponent } from '../about/about.component';
import { MenuComponent } from '../menu/menu.component';

const routes: Routes = [
   { 
     path: 'profiles', 
     component: ProfileComponent 
   },
   { 
     path: 'add', 
     component: AddProfileComponent 
   },
   { 
     path: 'profiles/:id', 
     component: ProfileDetailsComponent 
   },
   { 
     path: '', 
     redirectTo: 'signin', 
     pathMatch: 'full'
   },
   { 
     path: 'signin', 
     component: SignInComponent 
   },
   { 
     path: 'contact', 
     component: ContactComponent 
   },
   { 
     path: 'about', 
     component: AboutComponent 
   },
   { 
     path: 'signup', 
     component: SignUpComponent 
   },
   { 
     path: '**', 
     component: PageNotFoundComponent
   },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}