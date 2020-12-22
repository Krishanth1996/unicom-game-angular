import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  isAdmin=this.auth.isAdmin;

  newUser=new FormGroup({
     name: new FormControl(''),
     pass:new FormControl('')
  });

  newItem= new FormGroup({
    name:new FormControl(''),
    url:new FormControl('')
   
  })

  constructor(
    private auth:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
  
  }
  
  newUserCollection(){
  
    this.auth.newUser(this.newUser.value).subscribe((data)=>{
      console.warn("result : ",data);
    })
    this.newUser.reset()
  }


  newItemCollection(){
      this.auth.newItem(this.newItem.value).subscribe((data)=>{
        console.warn("new item added");
      })
      this.newItem.reset()
  }
}
