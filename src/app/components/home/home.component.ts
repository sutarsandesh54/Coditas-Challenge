import { AfterContentChecked, ChangeDetectorRef } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { UserDataService } from "src/app/services/user-data.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, AfterContentChecked {
  isExpanded = false;
  buttonName: string = "Details";
  searchedUserdata = [];
  userData = [];
  userDetails = [];
  pageData = [];
  totaldata = 0;
  userSearch: string;
  userClicked = [];
  isClicked;
  constructor(
    private service: UserDataService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {}
  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
  buttonClicked(e) {
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded) {
      this.buttonName = "Collapse";
    } else {
      this.buttonName = "Details";
    }
    this.service.getUserRepoData(this.userSearch).subscribe((data) => {
      this.userDetails = data;
    });
  }

  getEmittedData(data) {
    this.userSearch = data;
    this.service.getUserData(data).subscribe((userdata) => {
      this.userData = userdata.items;
      this.totaldata = userdata.total_count;
    });
  }
  singlePageData(data) {
    this.pageData = data;
    //this.pageData.sort((a, b) => a.login.localeCompare(b.login));
  }
  dropDownEmittedData(data) {
    // "By Name (A - Z)",
    // "By Name (Z - A)",
    // "By Rank ↑",
    // "By Rank ↓",
    console.log("dropdown=", data);
    let sortedData = [];
    // if (data === "By Name (A - Z)") {
   // this.pageData.sort((a, b) => a.login.localeCompare(b.login));
    sortedData = this.pageData;
    //   console.log("sorted data=", this.userData);
    //   this.pageData=this.userData;
    // }
  }
}
