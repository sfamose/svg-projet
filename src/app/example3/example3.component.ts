import {Component, OnInit} from '@angular/core';
import {Data} from "../shared/data";

@Component({
  selector: 'app-example3',
  templateUrl: './example3.component.html',
  styleUrls: ['./example3.component.css']
})
export class Example3Component implements OnInit {

  public dataList: Data[];

  constructor() {
  }

  ngOnInit() {
    this.dataList = [
      {
        title: 'A', children: [
        {
          title: 'A1', children: [
          {title: 'A11', children: []},
          {title: 'A12', children: []},
          {title: 'A13', children: []}
        ]
        },
        {title: 'A2', children: []},
      ]
      },
      {
        title: 'B', children: [
        {title: 'B1', children: []},
        {title: 'B2', children: []}
      ]
      },
      {title: 'C', children: []}
    ]
  }

}
