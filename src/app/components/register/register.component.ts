import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, 
  ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { HelperService } from 'src/app/services/helper.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private helper : HelperService, private http: HttpClient, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) { }
  userForm
  submitted = false;
  userId
  ngOnInit(): void {
    //clearing storage for the next registration
    localStorage.clear();
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
      this.userId = Object.values(response).length + 1;
    });
  }
  register(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post('http://localhost:3000/users/', JSON.stringify(this.userForm.value), httpOptions).subscribe(response => {
      localStorage.setItem('username',this.userForm.value.login.username)
      localStorage.setItem('userId',this.userId)
      this.router.navigate(['/home'])
      console.log("Registered")
    });;
  }

}
