import {Component, OnInit} from '@angular/core';
import {Profile} from "./model/profile";
import {Skills} from "./model/skills";
import {Projects} from "./model/projects";
import {WorkExperience} from "./model/work-experience";
import {DataService} from "./services/data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'portfolio';

  profile!: Profile;
  skills!: Skills;
  projects!: Projects;
  work!: WorkExperience;

  constructor(private dataService: DataService) {

  }

  async ngOnInit(): Promise<void> {
    this.smoothScroll();
    try {
      this.profile = await this.dataService.getProfile();
      this.work = await this.dataService.getWorkExperience();
      this.skills = await this.dataService.getSkills();
      this.projects = await this.dataService.getProjects();
    } catch (e) {
      console.log(e);
    }
  }

  smoothScroll(): void {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // @ts-ignore
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  }


}
