import { Component, OnInit } from '@angular/core';
import { Well } from '../shared/models/well';
import { DataService } from '../shared/services/dataService'
import { ScrollEvent } from 'ngx-scroll-event';
import * as _ from 'lodash'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  allWells: Well[];
  Wells: Well[];
  pageNumber = -1;
  pageSize = 5;
  Loading = false;
  sortOrder = 0;
  activeTab = "map"
  constructor(private dataService: DataService) {

  }

  ngOnInit() {
    this.dataService.getWells().subscribe(wells => {
      this.allWells = wells;
      this.Wells = [];
      this.loadNextPage();
    })
  }

  loadNextPage() {

    /* settime out to show network latency */

    if (this.pageSize * this.pageNumber < this.allWells.length) {
      this.Loading = true;
      setTimeout(() => {
        {
          this.pageNumber++;
          let newItems = _.chunk(this.allWells, this.pageSize)[this.pageNumber];
          this.Wells.push(...newItems);
        }
        this.Loading = false;
      }, 3000);
    }

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

  selectTab(tab: string) {
    this.activeTab = tab;
  }
  isActive(tab: string){
    return this.activeTab === tab;
  }
}