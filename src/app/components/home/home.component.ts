import {
  AfterContentChecked,
  ChangeDetectorRef,
  ElementRef,
  OnChanges,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterContentChecked {
  public isExpanded = false;
  public buttonName = 'Details';
  public searchedUserdata = [];
  public userData = [];
  public userDetails = [];
  public pageData = [];
  public totaldata = 0;
  public userSearch: string;
  public userClicked = [];
  public idArray = [];
  public emittedChoice;
  public isClicked;

  constructor(
    private service: UserDataService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  // for change Detection Purpose
  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  buttonClicked(userDetails) {
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded) {
      this.buttonName = 'Collapse';
      this.idArray.push(userDetails.id);
      this.service.getUserRepoData(userDetails.login).subscribe((data) => {
        this.pageData.map((ele) => {
          if (ele.id === data[0].owner.id) {
            ele['repo'] = data;
          }
        });
        console.log('tttttt', this.pageData);
        this.userDetails = data;
      });
    } else {
      this.buttonName = 'Details';
      // this.idArray.pop();
    }
  }

  // for All User Data
  public getEmittedData(data) {
    this.userSearch = data;
    this.service.getUserData(this.userSearch).subscribe((userdata) => {
      this.userData = userdata.items;

      this.totaldata = userdata.total_count;
    });
  }

  public singlePageData(data) {
    this.pageData = data;
  }

  // for Sorting functionality
  public dropDownEmittedData(data) {
    this.emittedChoice = data;
    switch (this.emittedChoice) {
      case 'By Name (A - Z)':
        this.userData = this.userData.sort((a, b) =>
          a.login.localeCompare(b.login)
        );
        this.userData =  [...this.userData ];
        break;
      case 'By Name (Z - A)':
        this.userData.sort((a, b) => a.login.localeCompare(b.login));
        this.userData = this.userData.reverse();
        this.userData =  [...this.userData ];
        break;
      case 'By Rank ↑':
        this.userData = this.userData.sort((a, b) => a.id - b.id);
        this.userData =  [...this.userData ];
        break;
      case 'By Rank ↓':
        this.userData.sort((a, b) => a.id - b.id);
        this.userData = this.userData.reverse();
        this.userData =  [...this.userData ];
        break;
      default:
    }
  }
}
