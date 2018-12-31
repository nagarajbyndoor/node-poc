import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { AddProfileComponent } from '../add-profile/add-profile.component';
import { ProfileDetailsComponent } from '../profile-details/profile-details.component';

const routes: Routes = [
   { 
     path: 'profiles', 
     component: ProfileComponent 
   },
   { 
     path: 'profile/add', 
     component: AddProfileComponent 
   },
   { 
     path: 'profiles/:id', 
     component: ProfileDetailsComponent 
   },
   { 
     path: '', 
     redirectTo: 'profiles', 
     pathMatch: 'full'
   }, 
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}