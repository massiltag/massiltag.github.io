import {Component, Input, OnInit} from '@angular/core';
import {Profile} from "../../../model/profile";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  @Input() profile!: Profile;

  constructor() { }

  ngOnInit(): void {
  }

}
