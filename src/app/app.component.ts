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
      console.log('PROFILE', this.profile);

      this.work = await this.dataService.getWorkExperience();
      console.log('WORK', this.work);

      this.skills = await this.dataService.getSkills();
      console.log('SKILLS', this.skills);

      this.projects = await this.dataService.getProjects();
      console.log('PROJECTS', this.dataService);
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
