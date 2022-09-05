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
    // this.http
    //   .get(`http://127.0.0.1:8000/?lng=${this.lng}&lat=${this.lat}`)
    //   .subscribe((res: any) => {
    //     this.data = res;
    //   });
    this.data = [
      {
        zip: '11901',
        lat: 40.92424,
        lng: -72.64697,
        city: 'Riverhead',
        state_id: 'NY',
        state_name: 'New York',
        county_fips: '36103',
        county_name: 'Suffolk',
        isActive: false,
        dist: 0.9364630339360601,
        price: 5.6,
      },
      {
        zip: '11931',
        lat: 40.93347,
        lng: -72.62195,
        city: 'Aquebogue',
        state_id: 'NY',
        state_name: 'New York',
        county_fips: '36103',
        county_name: 'Suffolk',
        isActive: false,
        dist: 2.3865918628603153,
        price: 5,
      },
      {
        zip: '11947',
        lat: 40.94302,
        lng: -72.58189,
        city: 'Jamesport',
        state_id: 'NY',
        state_name: 'New York',
        county_fips: '36103',
        county_name: 'Suffolk',
        isActive: false,
        dist: 4.55817562239446,
        price: 5.611,
      },
      {
        zip: '11933',
        lat: 40.92449,
        lng: -72.75453,
        city: 'Calverton',
        state_id: 'NY',
        state_name: 'New York',
        county_fips: '36103',
        county_name: 'Suffolk',
        isActive: false,
        dist: 4.851525502090857,
        price: 5.611,
      },
      {
        zip: '11970',
        lat: 40.94029,
        lng: -72.57403,
        city: 'South Jamesport',
        state_id: 'NY',
        state_name: 'New York',
        county_fips: '36103',
        county_name: 'Suffolk',
        isActive: false,
        dist: 4.872547584077033,
        price: 5.611,
      },
      {
        zip: '11978',
        lat: 40.82878,
        lng: -72.64669,
        city: 'Westhampton Beach',
        state_id: 'NY',
        state_name: 'New York',
        county_fips: '36103',
        county_name: 'Suffolk',
        isActive: false,
        dist: 6.14998273078397,
        price: 5.611,
      },
      {
        zip: '11977',
        lat: 40.82769,
        lng: -72.67947,
        city: 'Westhampton',
        state_id: 'NY',
        state_name: 'New York',
        county_fips: '36103',
        county_name: 'Suffolk',
        isActive: false,
        dist: 6.238178434405469,
        price: 5.611,
      },
      {
        zip: '11948',
        lat: 40.9662,
        lng: -72.55797,
        city: 'Laurel',
        state_id: 'NY',
        state_name: 'New York',
        county_fips: '36103',
        county_name: 'Suffolk',
        isActive: false,
        dist: 6.410813983958901,
        price: 5.611,
      },
      {
        zip: '11942',
        lat: 40.84901,
        lng: -72.57764,
        city: 'East Quogue',
        state_id: 'NY',
        state_name: 'New York',
        county_fips: '36103',
        county_name: 'Suffolk',
        isActive: false,
        dist: 6.448917489810187,
        price: 5.611,
      },
      {
        zip: '11941',
        lat: 40.83311,
        lng: -72.72315,
        city: 'Eastport',
        state_id: 'NY',
        state_name: 'New York',
        county_fips: '36103',
        county_name: 'Suffolk',
        isActive: false,
        dist: 6.617118563112063,
        price: 5.611,
      },
    ];
  }
}
