import { Component, OnInit } from '@angular/core';
import { Well } from '../shared/models/well';
import { DataService } from '../shared/services/dataService'
import { ScrollEvent } from 'ngx-scroll-event';
import * as _ from 'lodash'

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit {
  allWells: Well[][];
  Wells: Well[][];
  showMonths = 0;
  Loading = false;
  sortOrder = 0;
  monthNames = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
  ];
  constructor(private dataService: DataService) {

  }

  ngOnInit() {
    this.dataService.getWells().subscribe(wells => {
      // this.allWells = wells;
      let futureWells = _.filter(wells, itm => {
        let fracStart = new Date(itm.fracStart);
        let currentDate = new Date();
        return fracStart >= currentDate;
      })
      let grouped = _.groupBy(futureWells, itm => {
        let fracStart = new Date(itm.fracStart);
        let key = fracStart.getFullYear() * 12 + fracStart.getMonth();

        return key;
      });
      console.log(_.toArray(grouped));
      this.allWells = _.toArray(grouped);
      this.Wells = [];
      while (this.showMonths <= 2) {
        this.Wells.push(this.allWells[this.showMonths]);
        this.showMonths++;
      }
    });
  }

  loadNextPage() {

    /* settime out to show network latency */

    if (this.showMonths < this.allWells.length) {
      this.Loading = true;
      setTimeout(() => {
        {
          this.showMonths++;
          this.Wells.push(this.allWells[this.showMonths]);
        }
        this.Loading = false;
      }, 3000);
    }
  }
  getMonthName(d: string) {
    let dt = new Date(d);
    return this.monthNames[dt.getMonth()]
  }
  getYear(d: string) {
    let dt = new Date(d);
    return dt.getFullYear();
  }
  sort(column: string) {
    this.sortOrder = (this.sortOrder + 1) % 2;
    let that = this;
    this.Wells = this.Wells.sort(function (a, b) {
      if (that.sortOrder == 0) {
        if (a[column] < b[column]) return 1;
        if (b[column] < a[column]) return -1;
      } else {
        if (a[column] < b[column]) return -1;
        if (b[column] < a[column]) return 1;
      }
      return 0;
    });
  }

  handleScroll(event: ScrollEvent) {
    console.log('scroll occurred', event.originalEvent);
    if (event.isReachingBottom) {
      this.loadNextPage();
    }
    // if (event.isReachingTop) {
    //   console.log(`the user is reaching the bottom`);
    // }
    // if (event.isWindowEvent) {
    //   console.log(`This event is fired on Window not on an element.`);
    // }

  }

  startsInText(startsIn: Number): string | Number {
    if (startsIn === 0) {
      return "Started";
    } else {
      return startsIn;
    }
  }
}