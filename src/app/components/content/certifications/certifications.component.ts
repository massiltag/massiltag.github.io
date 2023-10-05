import {Component, Input, OnInit} from '@angular/core';
import {Degree} from "../../../model/profile";

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.scss']
})
export class CertificationsComponent implements OnInit {
  @Input() certifications!: Degree[];

  constructor() { }

  ngOnInit(): void {
  }

}
