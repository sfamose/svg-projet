import {Component, OnInit, Input, RenderComponentType} from '@angular/core';
import {Data} from "../data";
import {Rect} from "../rect";
import {Path} from "../path";

@Component({
  selector: 'app-organizational-chart',
  templateUrl: 'organizational-chart.component.html',
  styleUrls: ['organizational-chart.component.css']
})
export class OrganizationalChartComponent implements OnInit {

  @Input() dataList: Data[];
  public rectList: Rect[] = [];
  public pathList: Path[] = [];
  private maxHeight: number = 0;
  private height: number = 30;
  private heightGap: number = 10;
  private width: number = 50;
  private widthGap: number = 40;

  constructor() {
  }

  ngOnInit() {
    const total = this.calculPosition(this.dataList, 0);
    console.log(total);
  }

  private calculPosition(dataList: Data[], level: number): {min: number, max: number, list: number[]} {
    const childrenHeight: {min: number, max: number, list: number[]} = {
      min: null,
      max: null,
      list: []
    };
    for (let data of dataList) {
      if (!data.children || data.children.length == 0) {
        const childHeight = this.maxHeight + this.heightGap;
        this.addRect(level, childHeight);
        childrenHeight.list.push(childHeight);
        if (!childrenHeight.min) {
          childrenHeight.min = childHeight;
        }
        childrenHeight.max = childHeight;
        this.maxHeight += this.heightGap + this.height;
      }
      else {
        const ch = this.calculPosition(data.children, level + 1);
        const parentHeight = ch.min + (ch.max - ch.min) / 2;
        this.addRect(level, parentHeight);
        childrenHeight.list.push(parentHeight);
        childrenHeight.max = ch.max;
        childrenHeight.min = childrenHeight.min != null ? Math.min(parentHeight, childrenHeight.min) : parentHeight;

        //path between parent and children
        for (let h of ch.list) {
          this.addPath(level, parentHeight, h);
        }
      }
    }
    return childrenHeight;
  }

  private addRect(level: number, y: number) {
    this.rectList.push({
      x: level * (this.width + this.widthGap) + this.widthGap,
      y: y,
      width: this.width,
      height: this.height,
    });
  }

  private addPath(level, parentY, childY) {
    const parentX = (level + 1) * (this.width + this.widthGap);
    const childX = parentX + this.widthGap;
    this.pathList.push({
      d: 'M ' + parentX + ' ' + (parentY + this.height/2) + ' L ' + childX + ' ' + (childY + this.height/2)
    })
  }
}
