import { Component, HostListener, OnInit } from '@angular/core'
import { ApiService } from '../services/api.service'

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  filter: String = 'high'
  productData: Array<any> = []
  dataToShow: Array<any> = []
  fetching: boolean = true
  defaultImage = 'assets/images/default-product-image.png'
  totalDataToshow = 0
  constructor(
    public api: ApiService
  ) {
    this.api.getProductList().subscribe((resp: any) => {
      this.productData = resp.products
      for (let i = 1; i <= 3; i++) {
        if (this.productData.length > 0) {
          this.setLengthOfData()
        }
      }
      this.fetching = false
    })
  }

  ngOnInit(): void {
  }
  @HostListener("window:scroll", [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY + 10) >= document.body.offsetHeight) {
      if (this.productData.length == 0) {

        return
      } else {
        this.setLengthOfData()
      }
    }
  }
  setLengthOfData() {
    let currentItterationLength = 0
    if (this.productData.length > 2) {
      this.totalDataToshow += 3
      currentItterationLength = 3
    } else if (this.productData.length > 1) {
      this.totalDataToshow += 2
      currentItterationLength = 2
    } else {
      this.totalDataToshow += 1
      currentItterationLength = 1
    }
    const data = [...this.productData]
    data.splice(currentItterationLength, this.productData.length)
    this.dataToShow = [...this.dataToShow, ...data]
    this.productData.splice(0, currentItterationLength)
    this.changeProductOrder()
  }

  addItemToCart(itemObject: any) {
    this.api.addItemToCart(itemObject)
  }
  
  removeItemFromCart(id: number) {
    this.api.removeItemFromCart(id)
  }

  changeProductOrder() {
    if (this.filter == 'high') {
      this.dataToShow = this.dataToShow.sort((a, b) => b.variants[0]?.price - a.variants[0]?.price)
    } else if (this.filter == 'low') {
      this.dataToShow = this.dataToShow.sort((a, b) => a.variants[0]?.price - b.variants[0]?.price)
    } else if (this.filter == 'a-z') {
      this.dataToShow = this.dataToShow.sort((a, b) => {
        if (a.title < b.title) { return -1; }
        if (a.title > b.title) { return 1; }
        return 0;
      })
    } else {
      this.dataToShow = this.dataToShow.sort((a, b) => {
        if (a.title < b.title) { return 1; }
        if (a.title > b.title) { return -1; }
        return 0;
      })
    }
  }
}
