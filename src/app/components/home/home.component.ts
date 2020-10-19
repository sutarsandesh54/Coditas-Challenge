import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isExpanded = false;
  buttonName:string='Details';

  constructor() { }

  ngOnInit() {
  }
  buttonClicked(e){
    this.isExpanded = !this.isExpanded;
    if(this.isExpanded){
      this.buttonName="Collapse"
    }else{
      this.buttonName="Details"
    }
  }
}
