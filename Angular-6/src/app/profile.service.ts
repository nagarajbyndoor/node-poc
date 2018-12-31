import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from './profile';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profilesUrl = 'http://localhost:8080/api/profiles';  // URL to web api
  constructor( 
    private http: HttpClient
  ) { }

  getProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.profilesUrl)
  }

  getProfile(id: number): Observable<Profile> {
    const url = `${this.profilesUrl}/${id}`;
    return this.http.get<Profile>(url);
  }

  addProfile(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(this.profilesUrl, profile, httpOptions);
  }

  deleteProfile(profile: Profile | number): Observable<Profile> {
    const id = typeof profile === 'number' ? profile : profile.id;
    const url = `${this.profilesUrl}/${id}`;

    return this.http.delete<Profile>(url, httpOptions);
  }

  updateProfile(profile: Profile): Observable<any> {
    return this.http.put(this.profilesUrl, profile, httpOptions);
  }
}