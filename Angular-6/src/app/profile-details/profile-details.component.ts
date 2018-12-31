import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile';
import { ProfileService } from '../profile.service';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {

  profile = new Profile() ;
  submitted = false;
  message: string;
  confirmMsg = false;

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.profileService.getProfile(id)
      .subscribe(profile => this.profile = profile);
  }

  update(): void {
    this.submitted = true;
    this.profileService.updateProfile(this.profile)
        .subscribe(result => this.message = "Profile Updated Successfully!");
  }

  delete(): void {
    this.submitted = true;
    this.confirmMsg = window.confirm("Do you really want to delete this profile?");
    if(this.confirmMsg == true){
      this.profileService.deleteProfile(this.profile.id)
        .subscribe(result => this.message = "Profile Deleted Successfully!");
    }
  }

  goBack(): void {
    this.location.back();
  }
}