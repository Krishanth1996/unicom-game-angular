import { Component, OnInit } from '@angular/core';
import { CardsService } from '../cards.service';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  display = "none";
  showModalItem=false;
  ImageURL:string;
  name:string;
  battle:string;
  cardsList={};
  isAvailableModal:boolean;
  itemDetailList={
    primaryItemImage:'',
    primaryItem:'',
    imgUrlPrimary:'',
    
  }

  constructor(
    private cardsService:CardsService
  ) { }

  
  ngOnInit(): void {
    this.getAll()
  }

  showModalClickItem(){
     this.showModalItem=!this.showModalItem;
  }

  openModal(card) {
    this.display = "block";
      this.itemDetailList.primaryItemImage=card.primaryItemImage;
      this.itemDetailList.primaryItem=card.primaryItem;
      this.itemDetailList.imgUrlPrimary=card.imgUrlPrimary;
      if(card.primaryItemImage){
        this.isAvailableModal=true
      }
  }
  openModalItem2(card) {
    this.display = "block";
      this.itemDetailList.primaryItemImage=card.Item2Image;
      this.itemDetailList.primaryItem=card.item2;
      this.itemDetailList.imgUrlPrimary=card.imgUrlItem2;
  }

   openModalItem3(card) {
    this.display = "block";
      this.itemDetailList.primaryItemImage=card.Item3Image;
      this.itemDetailList.primaryItem=card.item3;
      this.itemDetailList.imgUrlPrimary=card.imgUrlItem3;
  }

  
  onCloseHandled() {
    this.display = "none";
  }
  getAll():void{
    this.cardsService.GetAll().subscribe(res=>{
      console.log(res);
      this.cardsList=res;
    })
  }
  
}
