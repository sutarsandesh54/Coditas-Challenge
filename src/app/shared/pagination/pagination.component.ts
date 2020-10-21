import { EventEmitter, OnChanges } from "@angular/core";
import { Output } from "@angular/core";
import { Input } from "@angular/core";
import { Component } from "@angular/core";
import { PaginationService } from "src/app/services/pagination.service";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.scss"],
})
export class PaginationComponent implements OnChanges {
  @Input() allitem: [];
  @Output() pageData = new EventEmitter<any>();
  // pager object
  public pager: any = {};
  // paged items
  public pagedItems: any[];

  constructor(private pagerService: PaginationService) {}

  ngOnChanges() {
    if (this.allitem) {
      this.setPage(1);
    }
  }

  public setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allitem.length, page);

    // get current page of items
    this.pagedItems = this.allitem.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );

    this.pageData.emit(this.pagedItems);
  }
}
