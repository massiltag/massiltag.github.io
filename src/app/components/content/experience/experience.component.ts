// @ts-nocheck
import {Component, Input, OnInit} from '@angular/core';
import {WorkExperience} from "../../../model/work-experience";

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  @Input() work!: WorkExperience;

  activeTab = 1;

  constructor() { }

  ngOnInit(): void {}

}
