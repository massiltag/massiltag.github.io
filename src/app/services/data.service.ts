import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getProfile(): Promise<any> {
    return this.http.get('assets/json/profile.json').toPromise();
  }

  getSkills(): Promise<any> {
    return this.http.get('assets/json/skills.json').toPromise();
  }

  getWorkExperience(): Promise<any> {
    return this.http.get('assets/json/work-experience.json').toPromise();
  }

  getProjects(): Promise<any> {
    return this.http.get('assets/json/projects.json').toPromise();
  }

}
