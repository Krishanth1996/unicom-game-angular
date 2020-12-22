import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(
    private http:HttpClient
  ) { }

   GetAll()
  {
    return this.http.get("http://localhost:3000/user/cards")
  }

   finish()
  {
    return this.http.post("http://localhost:3000/user/finish",{})
  }
}
