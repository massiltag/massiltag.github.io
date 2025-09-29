import {Component, Input, OnInit} from '@angular/core';
import {Work} from "../../../../model/work-experience";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  @Input() w: Work = {} as Work;

  constructor() { }

  ngOnInit(): void {
  }

}
