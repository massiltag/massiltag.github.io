import {Component, Input, OnInit} from '@angular/core';
import {Projects} from "../../../model/projects";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  @Input() projects!: Projects;

  constructor() { }

  ngOnInit(): void {
  }

}
