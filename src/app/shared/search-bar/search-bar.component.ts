import { Component, OnInit } from "@angular/core";
import { UserDataService } from "src/app/services/user-data.service";

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"],
})
export class SearchBarComponent implements OnInit {
  isExpanded = false;
  mydata;
  listElements = [
    "By Name (A - Z)",
    "By Name (Z - A)",
    "By Rank ↑",
    "By Rank ↓",
  ];
  constructor(private ser: UserDataService) {}

  ngOnInit() {
    this.ser.getUserData().subscribe((data) => {
      console.log(data);
      this.mydata=data;
    });
  }
  dropDownClicked(e) {
    this.isExpanded = !this.isExpanded;
  }
  onSearchChange(searchValue: string): void {
    console.log("key pressed", searchValue);
  }
  dropdownItemClicked(item) {
    console.log("clicked item=", item);
  }
}
