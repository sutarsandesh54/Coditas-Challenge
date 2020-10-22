import { DOCUMENT } from "@angular/common";
import { ChangeDetectorRef, Inject, OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { RepoDetails } from "src/app/models/data.model";
import { UserDataService } from "src/app/services/user-data.service";
import { COLLAPSE_TEXT, DETAIL_TEXT } from "src/app/shared/constants/constants";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  public isExpanded = false;
  public searchedUserdata = [];
  public userData = [];
  public userDetails: RepoDetails;
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

  ngOnInit() {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }

  /* Detail Button Click */
  public buttonClicked(userDetails): void {
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded) {
      this.idArray.push(userDetails.id);
      this.service.getUserRepoData(userDetails.login).subscribe((data) => {
        this.pageData.map((ele) => {
          if (ele.id === data[0].owner.id) {
            ele.repo = data;
            ele.buttonText = COLLAPSE_TEXT;
          }
        });
        this.userDetails = data;
      });
    } else {
      this.pageData.map((ele) => {
        if (ele.id === userDetails.id) {
          delete ele.repo;
          ele.buttonText = DETAIL_TEXT;
        }
      });
    }
  }
  /*  for All User Data*/
  public getEmittedData(data) {
    this.userSearch = data;
    this.service.getUserData(this.userSearch).subscribe((userdata) => {
      this.userData = userdata.items;

      this.totaldata = userdata.total_count;
    });
  }

  /* Pagination Data */
  public singlePageData(data) {
    this.pageData = data;
    this.changeDetector.detectChanges();
  }

  /*  Sorting functionality */
  public dropDownEmittedData(data) {
    this.emittedChoice = data;
    switch (this.emittedChoice) {
      case "By Name (A - Z)":
        this.userData = this.userData.sort((a, b) =>
          a.login.localeCompare(b.login)
        );
        this.userData = [...this.userData];
        break;
      case "By Name (Z - A)":
        this.userData.sort((a, b) => a.login.localeCompare(b.login));
        this.userData = this.userData.reverse();
        this.userData = [...this.userData];
        break;
      case "By Rank ↑":
        this.userData = this.userData.sort((a, b) => a.id - b.id);
        this.userData = [...this.userData];
        break;
      case "By Rank ↓":
        this.userData.sort((a, b) => a.id - b.id);
        this.userData = this.userData.reverse();
        this.userData = [...this.userData];
        break;
      default:
    }
  }
}
