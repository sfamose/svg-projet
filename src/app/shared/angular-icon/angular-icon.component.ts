import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-angular-icon',
  templateUrl: 'angular-icon.component.html',
  styleUrls: ['angular-icon.component.css']
})
export class AngularIconComponent implements OnInit {

  public circle = [100, 100];

  constructor() {
  }

  ngOnInit() {
  }

  public setCircleLocation(event) {
    this.circle = [event.pageX, event.pageY];
  }
}
