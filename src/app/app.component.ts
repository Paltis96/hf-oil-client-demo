import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
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
  ngOnInit(): void {
    this.getData();
  }
}
