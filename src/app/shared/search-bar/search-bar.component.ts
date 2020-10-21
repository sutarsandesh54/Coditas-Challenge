import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { UserDataService } from "src/app/services/user-data.service";

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"],
})
export class SearchBarComponent implements OnInit {
  public isExpanded = false;
  public listElements = [
    "By Name (A - Z)",
    "By Name (Z - A)",
    "By Rank ↑",
    "By Rank ↓",
  ];
  @Output() emittedData = new EventEmitter<any>();
  @Output() emittedDropdownData = new EventEmitter<any>();

  constructor(private service: UserDataService) {}

  ngOnInit() {}
  public dropDownClicked(e) {
    this.isExpanded = !this.isExpanded;
  }

  public onSearchChange(searchValue: string): void {
    this.emittedData.emit(searchValue);
  }
  public dropdownItemClicked(item) {
    this.emittedDropdownData.emit(item);
  }
}
