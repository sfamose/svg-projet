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
  @Input() height: number = 30;
  @Input() heightGap: number = 10;
  @Input() width: number = 50;
  @Input() widthGap: number = 40;
  public rectList: Rect[] = [];
  public pathList: Path[] = [];
  public maxWidth: number = 0;
  public maxHeight: number = 0;
  private maxLevel: number = 0;

  constructor() {
  }

  ngOnInit() {
    this.calculPosition(this.dataList, 0);
    this.maxWidth = (this.maxLevel + 1) * (this.width + this.widthGap) + this.widthGap;
    this.maxHeight = this.maxHeight + this.heightGap;
    console.log(this.maxWidth, this.maxHeight);
  }

  private calculPosition(dataList: Data[], level: number): {min: number, max: number, list: number[]} {
    this.maxLevel = Math.max(level, this.maxLevel);
    const childrenHeight: {min: number, max: number, list: number[]} = {
      min: null,
      max: null,
      list: []
    };
    for (let data of dataList) {
      if (!data.children || data.children.length == 0) {
        const childHeight = this.maxHeight + this.heightGap;
        this.addRect(level, childHeight, data.title);
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
        this.addRect(level, parentHeight, data.title);
        childrenHeight.list.push(parentHeight);
        childrenHeight.max = ch.max;
        childrenHeight.min = childrenHeight.min != null ? Math.min(parentHeight, childrenHeight.min) : parentHeight;

        //path between parent and children
        for (let h of ch.list) {
          this.addPath(level, parentHeight + this.height / 2, h + this.height / 2);
        }
      }
    }
    return childrenHeight;
  }

  private addRect(level: number, y: number, label: string) {
    this.rectList.push({
      x: level * (this.width + this.widthGap) + this.widthGap,
      y: y,
      width: this.width,
      height: this.height,
      label: label
    });
  }

  private addPath(level, parentY, childY) {
    const parentX = (level + 1) * (this.width + this.widthGap);
    const childX = parentX + this.widthGap;
    const diffHeight = childY - parentY;
    //Départ
    let d = 'M ' + parentX + ' ' + parentY;
    //Inflexion1
    d += ' Q ' + ( parentX + this.widthGap / 3) + ' ' + (parentY + diffHeight / 10);
    //Milieu
    d += ' ' + ( parentX + this.widthGap / 2) + ' ' + (parentY + diffHeight / 2);
    //Arrivée
    d += ' T ' + childX + ' ' + childY;
    this.pathList.push({
      d: d
    })
  }
}
