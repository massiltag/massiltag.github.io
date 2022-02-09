import {Component, Input, OnInit} from '@angular/core';
import {Profile} from "../../../model/profile";

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent implements OnInit {
  @Input() profile!: Profile;

  constructor() { }

  ngOnInit(): void {
  }

}
