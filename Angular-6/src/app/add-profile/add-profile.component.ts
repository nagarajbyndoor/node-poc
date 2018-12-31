import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile';
import { ProfileService } from '../profile.service';

import { Location } from '@angular/common';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.css']
})

export class AddProfileComponent{

  profile = new Profile();
  submitted = false;

  constructor(
    private profileService: ProfileService,
    private location: Location
  ) { }

  newProfile(): void {
    this.submitted = false;
    this.profile = new Profile();
  }

 addProfile() {
   this.submitted = true;
   this.save();
 }

  goBack(): void {
    this.location.back();
  }

  private save(): void {
    console.log(this.profile);
    this.profileService.addProfile(this.profile)
        .subscribe();
  }
}
