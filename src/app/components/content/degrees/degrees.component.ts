import {Component, Input, OnInit} from '@angular/core';
import {Education} from "../../../model/profile";

@Component({
  selector: 'app-degrees',
  templateUrl: './degrees.component.html',
  styleUrls: ['./degrees.component.scss']
})
export class DegreesComponent implements OnInit {
  @Input() education!: Education[];

  constructor() { }

  ngOnInit(): void {
  }

}
