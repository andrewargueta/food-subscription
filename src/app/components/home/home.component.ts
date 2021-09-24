import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { WeeklyMenu } from 'src/app/models/weekly-menu.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private helper : HelperService, private http : HttpClient) { }
  weeklyMeals
  user
  users
  
  ngOnInit(): void {
    this.helper.getMeals().subscribe(response => {
      this.weeklyMeals = response;
    });
    let id = localStorage['userId'];
    if(id == undefined){
      this.user = undefined;
    }else{
      this.helper.getUser(id).subscribe(response => {
        this.user = response;
      });
  }
    
  }

}
