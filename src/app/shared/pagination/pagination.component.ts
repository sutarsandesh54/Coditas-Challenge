import { EventEmitter, OnChanges, OnInit } from "@angular/core";
import { Output } from '@angular/core';
import { Input } from "@angular/core";
import { Component } from "@angular/core";
import { PaginationService } from "src/app/services/pagination.service";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.scss"],
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() allitem: [];
  @Output() pageData = new EventEmitter<any>();
  // array of all items to be paged
  private allItems: any[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];
  constructor(private pagerService: PaginationService) {}

  ngOnInit() {
    // get dummy data
  }
  ngOnChanges() {
    if (this.allitem) {
      this.setPage(1);
    }
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allitem.length, page);

    // get current page of items
    this.pagedItems = this.allitem.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
    // this.pagedItems.sort((a, b) => a.login.localeCompare(b.login));

    this.pageData.emit(this.pagedItems);

  }
}
