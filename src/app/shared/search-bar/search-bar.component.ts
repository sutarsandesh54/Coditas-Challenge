import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { UserDataService } from "src/app/services/user-data.service";

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"],
})
export class SearchBarComponent implements OnInit {
  isExpanded = false;
  allUsersData = [];
  mydata;
  listElements = [
    "By Name (A - Z)",
    "By Name (Z - A)",
    "By Rank ↑",
    "By Rank ↓",
  ];
  @Output() emittedData = new EventEmitter<any>();
  @Output() emittedDropdownData = new EventEmitter<any>();
  constructor(private service: UserDataService) {}

  ngOnInit() {}
  dropDownClicked(e) {
    this.isExpanded = !this.isExpanded;
  }
  onSearchChange(searchValue: string): void {
    console.log("key pressed", searchValue);
    
    this.emittedData.emit(searchValue);
  }
  dropdownItemClicked(item) {
    console.log("clicked item=", item);
    this.emittedDropdownData.emit(item);

  }
}
