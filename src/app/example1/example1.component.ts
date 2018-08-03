import {Component, OnInit} from '@angular/core';
import {interval} from "rxjs";

@Component({
  selector: 'app-example1',
  templateUrl: './example1.component.html',
  styleUrls: ['./example1.component.css']
})
export class Example1Component implements OnInit {

  value: number = 0;

  constructor() {
    const source = interval(200);
    const subscribe = source.subscribe(val => {
      this.value = this.value < 100 ? this.value + 1 : 0;
    });
  }

  ngOnInit() {
  }

}
