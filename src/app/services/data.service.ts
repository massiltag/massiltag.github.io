import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getProfile(): Promise<any> {
    return this.http.get('assets/profile.json').toPromise();
  }

  getSkills(): Promise<any> {
    return this.http.get('assets/skills.json').toPromise();
  }

  getWorkExperience(): Promise<any> {
    return this.http.get('assets/work-experience.json').toPromise();
  }

  getProjects(): Promise<any> {
    return this.http.get('assets/projects.json').toPromise();
  }

}
