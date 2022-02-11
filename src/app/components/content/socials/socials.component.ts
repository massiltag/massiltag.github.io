import {Component, Input, OnInit} from '@angular/core';
import {Social} from "../../../model/profile";

@Component({
  selector: 'app-socials',
  templateUrl: './socials.component.html',
  styleUrls: ['./socials.component.scss']
})
export class SocialsComponent implements OnInit {
  @Input() socials!: Social[];

  constructor() { }

  ngOnInit(): void {
  }

}
