import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CardsService } from '../cards.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginDetails= new FormGroup({
    name:new FormControl(''),
    pass:new FormControl('')
  })

  userLoggedIn=this.auth.isLoggedIn;
  userNameLoggedIn=''

  constructor(
    private auth:AuthService,
    private router:Router,
    private admin:CardsService
    ) 
    { }

  ngOnInit(): void {
    this.userNameLoggedIn = JSON.parse(localStorage.getItem('user'));

  }
  loginUser(){
    this.auth.getUserDetails(this.loginDetails.value);
    console.warn(this.loginDetails.value);

    
  }


}
