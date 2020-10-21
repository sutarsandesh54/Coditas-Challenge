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
  public pager: any = {};
  public pagedItems: any[];

  constructor(private pagerService: PaginationService) {}

  ngOnChanges() {
    if (this.allitem) {
      this.setPage(1);
    }
  }

  //for  setting page
  public setPage(page: number) {
    this.pager = this.pagerService.getPager(this.allitem.length, page);
    this.pagedItems = this.allitem.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );

    this.pageData.emit(this.pagedItems);
  }
}
