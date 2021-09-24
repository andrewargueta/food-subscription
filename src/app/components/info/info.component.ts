import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor(
    private helper:HelperService, 
    private http : HttpClient,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }
  user
  viewInfo = true;
  userForm
  loading = false;
  submitted = false;
  switchView(){
    this.viewInfo = false;
  }
  cancel(){
    this.viewInfo = true;
  }
  editUser(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.patch('http://localhost:3000/users/'+localStorage['userId'], JSON.stringify(this.userForm.value), httpOptions).subscribe(response => {
      console.log(response)
    });;
  }
  
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      address: this.formBuilder.group({
        housenumber: ['',[Validators.required]],
        streetname: ['',[Validators.required]],
        city: ['',[Validators.required, Validators.pattern('^[A-Za-z]+$')]],
        state: ['',[Validators.required, Validators.pattern('^[A-Za-z]+$')]],
        zip: ['',[Validators.required, Validators.pattern('^[0-9]{5}$')]]
      }),
      login: this.formBuilder.group({
        username: ['',[Validators.required]],
        password: ['',[Validators.required]],
        confirmPassword: ['',[Validators.required]],
      }),
  });  
    this.helper.getUser(localStorage['userId']).subscribe(response => {
      this.user = response;
    });
  }

}
