import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public loaded = false;
  ionViewDidEnter() {
    this.loaded = true;
    console.log('loaded');
    this.getData();
  }

  lng = -76.951368;
  lat = 41.716743;
  data: any;
  constructor(private http: HttpClient) {}

  getData() {
    this.http
      .get(`http://127.0.0.1:8000/?lng=${this.lng}&lat=${this.lat}`)
      .subscribe((res: any) => {
        this.data = res;
      });
  }

}
