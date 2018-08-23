import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-organizational-chart-item',
  templateUrl: './organizational-chart-item.component.html',
  styleUrls: ['./organizational-chart-item.component.css']
})
export class OrganizationalChartItemComponent implements OnInit {

  @Input() label: string;
  public showIcon: boolean;
  constructor() { }

  ngOnInit() {
  }

}
