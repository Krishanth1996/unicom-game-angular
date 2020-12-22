import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CardsService } from '../cards.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userNameLoggedIn=this.auth.isLoggedInStatus;
  isAdmin=this.auth.isAdmin;
  showModal=false;
  showModalExchange=false;
  userList={};
 itemBattleChance=0;
 userBattleChance=0;
  selectedUsers=[]

  battle=new FormGroup({
     allies:new FormControl(''),
     enemy:new FormControl(''),
     winner:new FormControl('')
  })

  exchanging= new FormGroup({
    from:new FormControl(''),
    to:new FormControl('')
  })

 
  constructor(private auth:AuthService,
    private router:Router,
    private admin:CardsService
    
    ) { }

  ngOnInit(): void {
    this.admin.GetAll()
    this.userData()
    this.setLoginStatus()
  }
  
 
  setLoginStatus(){
    this.userNameLoggedIn = JSON.parse(localStorage.getItem('user'));
  }
  
  userData():void{
    this.auth.GetAllUsers().subscribe(res=>{
      console.log(res);
      this.userList=res
    })
  }

  addItems(event){
    event.preventDefault();
    this.auth.itemPrimary().subscribe();
    console.log("Items Assigned")
    this.router.navigate(['admin'])
    window.alert("Items Assigned")
  }

  finishEvent(event){
    event.preventDefault();
    this.admin.finish().subscribe();
    console.log("Event Finished")
    window.alert("Items Cleared")
  }
  
  showModalClick(){
    this.showModal=!this.showModal;
  }

  showModalClickExchange(){
    this.showModalExchange=!this.showModalExchange;
  }

  logoutUser(){
    localStorage.removeItem('user'); 
    this.auth.setLoggedIn(false)
  }

  exchange(){
      console.warn(this.exchanging.value);
      this.auth.exchangeItem(this.exchanging.value).subscribe((data)=>{
        window.alert("Item Exchanged")
      })
    this.showModalClickExchange();
  }

  onChange(event){
    Object.entries(this.userList).forEach((value)=>{
      if(value=event.target.value){
        //  this.selectedUsers.push(value)
      }
    })
    
   
    
    
    console.log(this.selectedUsers)
  }

  battleResult(){   
   
    this.auth.getBattleItemChance(this.battle.value).subscribe((data)=>{
     this.itemBattleChance=data[0].battle
     this.userBattleChance=data[0].userBattle
      if ((this.itemBattleChance>0) && (this.userBattleChance>0)) {
    this.showModalClick();
    this.auth.battleWinner(this.battle.value).subscribe((data)=>{
      console.warn("Battle Result Updated");
     
      
    })
     window.alert("Battle Result Updated")
     this.battle.reset()
    }
    else{
      window.alert("Item/User Exceeded Its Battle Limit")
    }
    })
   
   
  }
}
