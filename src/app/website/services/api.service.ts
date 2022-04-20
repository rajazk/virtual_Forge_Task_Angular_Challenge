import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { apis } from '../../../environments/environment'
import {Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
baseUrl = apis.baseUrl
cartItems: Array<any> = []
totalCartPrice: number = 0
  constructor(
    public http: HttpClient,
  ) {

  }
  addItemToCart(itemObject: any) {
    this.cartItems.push(itemObject)
    this.totalCartPrice += +itemObject.variants[0]?.price
  }
  removeItemFromCart(id: number) {
    let index = this.cartItems.findIndex(d => d.id == id)
    this.totalCartPrice -= +this.cartItems[index].variants[0]?.price
    if (index > -1) {
      this.cartItems.splice(index, 1)
    }
  }

  //Api calls
  getProductList(): Observable<any> {
    const url = `${this.baseUrl}/products.json`

    return this.http.get<any>(url)
  }
}
