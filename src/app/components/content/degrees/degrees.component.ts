import {Component, Input, OnInit} from '@angular/core';
import {Degree} from "../../../model/profile";

@Component({
  selector: 'app-degrees',
  templateUrl: './degrees.component.html',
  styleUrls: ['./degrees.component.scss']
})
export class DegreesComponent implements OnInit {
  @Input() degrees!: Degree[];

  constructor() { }

  ngOnInit(): void {
  }

}
