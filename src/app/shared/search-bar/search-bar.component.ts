import { Component, EventEmitter, Output } from "@angular/core";
import { UserDataService } from "src/app/services/user-data.service";

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"],
})
export class SearchBarComponent {
  public isExpanded = false;
  public listElements = [
    "By Name (A - Z)",
    "By Name (Z - A)",
    "By Rank ↑",
    "By Rank ↓",
  ];
  @Output() searchBarData = new EventEmitter<any>();
  @Output() dropdownData = new EventEmitter<any>();

  constructor(private service: UserDataService) {}

  public dropDownClicked(e) {
    this.isExpanded = !this.isExpanded;
  }

  public onSearchChange(searchValue: string): void {
    this.searchBarData.emit(searchValue);
  }

  public dropdownItemClicked(item) {
    this.dropdownData.emit(item);
  }
}
