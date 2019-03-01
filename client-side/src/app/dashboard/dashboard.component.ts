import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userName:any;

  constructor() {
    this.userName = sessionStorage.getItem("userName");
    //console.log("userName", this.userName);


  }

  ngOnInit() {
  }

}
