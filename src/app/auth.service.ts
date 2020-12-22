import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
dataArray=[]
  isLoggedInStatus = JSON.parse(localStorage.getItem('user'));
  isAdmin=JSON.parse(localStorage.getItem('isAdmin'));
  constructor(
    private http:HttpClient,
    private router:Router) { }

  setLoggedIn(value:boolean){
    this.isLoggedInStatus=value
  }


  get isLoggedIn(){
    return this.isLoggedInStatus
  }

  getUserDetails(data){
    return this.http.post('http://localhost:3000/user/login',data).subscribe((data)=>{
    if(data){
    this.router.navigate(['admin'])
    this.setLoggedIn(true)
     localStorage.setItem('user',this.isLoggedIn.toString())
     localStorage.setItem('isAdmin',data[0].isAdmin)
     
  }
  else{
    window.alert("Invalid Credentitals")
  }
})
  }

  itemPrimary(){
     return this.http.post('http://localhost:3000/user/itemPrimary',{
       asign:1
     })
  }

  getBattleItemChance(data){
    return this.http.post('http://localhost:3000/user/battle/itemChance',data)
  }

  newUser(data){
    return this.http.post('http://localhost:3000/user/newuser',data)
  }

  newItem(data){
    return this.http.post('http://localhost:3000/user/newitem',data)
  }

  battleWinner(data){
    return this.http.post('http://localhost:3000/user/battle',data)
  }

  exchangeItem(data){
    return this.http.post('http://localhost:3000/user/exchange',data)
  }

    GetAllUsers()
  {
    return this.http.get("http://localhost:3000/user/all")
  }
}
