import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { FormGroup, FormControl, FormBuilder, Validators, 
  ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  import { Router } from '@angular/router';
import { AuthService } from '../../authentication/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }
  loginForm = this.formBuilder.group({
    username:['',Validators.required],
    password:['', Validators.required]
  })
  ngOnInit(): void {
    // to empty the localStorage for the next user logging in
    localStorage.clear();
  }
  async login(){
    // Authentication: 4.calling the authenticate method created in the auth service
    let verfication = await this.authService.authenticate(this.loginForm.value)
    if(verfication){
      this.router.navigate(['/home'])
    }
    else if(verfication == false){
      alert('Wrong password.')
    }
    else if(verfication == null){
      alert('User does not exist.')
    }
  }


}
