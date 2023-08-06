import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
role:string
  constructor() { }

  ngOnInit(): void {
    if(localStorage.length<1)
    {
      window.location.replace("");
    }
    else
    {
      this.role=localStorage.getItem("role");
    }
  }

}
