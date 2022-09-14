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
      // {
      //   zip: '11901',
      //   lat: 40.92424,
      //   lng: -72.64697,
      //   city: 'Riverhead',
      //   state_id: 'NY',
      //   state_name: 'New York',
      //   county_fips: '36103',
      //   county_name: 'Suffolk',
      //   isActive: false,
      //   dist: 0.9364630339360601,
      //   price: 5.6,
      // },
      // {
      //   zip: '11931',
      //   lat: 40.93347,
      //   lng: -72.62195,
      //   city: 'Aquebogue',
      //   state_id: 'NY',
      //   state_name: 'New York',
      //   county_fips: '36103',
      //   county_name: 'Suffolk',
      //   isActive: false,
      //   dist: 2.3865918628603153,
      //   price: 5,
      // },
      // {
      //   zip: '11947',
      //   lat: 40.94302,
      //   lng: -72.58189,
      //   city: 'Jamesport',
      //   state_id: 'NY',
      //   state_name: 'New York',
      //   county_fips: '36103',
      //   county_name: 'Suffolk',
      //   isActive: false,
      //   dist: 4.55817562239446,
      //   price: 5.611,
      // },
      // {
      //   zip: '11933',
      //   lat: 40.92449,
      //   lng: -72.75453,
      //   city: 'Calverton',
      //   state_id: 'NY',
      //   state_name: 'New York',
      //   county_fips: '36103',
      //   county_name: 'Suffolk',
      //   isActive: false,
      //   dist: 4.851525502090857,
      //   price: 5.611,
      // },
      // {
      //   zip: '11970',
      //   lat: 40.94029,
      //   lng: -72.57403,
      //   city: 'South Jamesport',
      //   state_id: 'NY',
      //   state_name: 'New York',
      //   county_fips: '36103',
      //   county_name: 'Suffolk',
      //   isActive: false,
      //   dist: 4.872547584077033,
      //   price: 5.611,
      // },
      // {
      //   zip: '11978',
      //   lat: 40.82878,
      //   lng: -72.64669,
      //   city: 'Westhampton Beach',
      //   state_id: 'NY',
      //   state_name: 'New York',
      //   county_fips: '36103',
      //   county_name: 'Suffolk',
      //   isActive: false,
      //   dist: 6.14998273078397,
      //   price: 5.611,
      // },
      // {
      //   zip: '11977',
      //   lat: 40.82769,
      //   lng: -72.67947,
      //   city: 'Westhampton',
      //   state_id: 'NY',
      //   state_name: 'New York',
      //   county_fips: '36103',
      //   county_name: 'Suffolk',
      //   isActive: false,
      //   dist: 6.238178434405469,
      //   price: 5.611,
      // },
      // {
      //   zip: '11948',
      //   lat: 40.9662,
      //   lng: -72.55797,
      //   city: 'Laurel',
      //   state_id: 'NY',
      //   state_name: 'New York',
      //   county_fips: '36103',
      //   county_name: 'Suffolk',
      //   isActive: false,
      //   dist: 6.410813983958901,
      //   price: 5.611,
      // },
      // {
      //   zip: '11942',
      //   lat: 40.84901,
      //   lng: -72.57764,
      //   city: 'East Quogue',
      //   state_id: 'NY',
      //   state_name: 'New York',
      //   county_fips: '36103',
      //   county_name: 'Suffolk',
      //   isActive: false,
      //   dist: 6.448917489810187,
      //   price: 5.611,
      // },
      // {
      //   zip: '11941',
      //   lat: 40.83311,
      //   lng: -72.72315,
      //   city: 'Eastport',
      //   state_id: 'NY',
      //   state_name: 'New York',
      //   county_fips: '36103',
      //   county_name: 'Suffolk',
      //   isActive: false,
      //   dist: 6.617118563112063,
      //   price: 5.611,
      // },
    // 
      {
          "zip": "02905",
          "lat": 41.78769,
          "lng": -71.39886,
          "city": "Providence",
          "state_id": "RI",
          "state_name": "Rhode Island",
          "county_fips": "44007",
          "county_name": "Providence",
          "isActive": false,
          "dist": 0,
          "price": 4.390000000000001
      },
      {
          "zip": "03242",
          "lat": 43.17365,
          "lng": -71.8224,
          "city": "Henniker",
          "state_id": "NH",
          "state_name": "New Hampshire",
          "county_fips": "33013",
          "county_name": "Merrimack",
          "isActive": false,
          "dist": 0,
          "price": 4.789000000000001
      },
      {
          "zip": "04921",
          "lat": 44.57256,
          "lng": -69.13326,
          "city": "Brooks",
          "state_id": "ME",
          "state_name": "Maine",
          "county_fips": "23027",
          "county_name": "Waldo",
          "isActive": false,
          "dist": 0,
          "price": 4.499
      },
      {
          "zip": "05158",
          "lat": 43.10299,
          "lng": -72.47296,
          "city": "Westminster",
          "state_id": "VT",
          "state_name": "Vermont",
          "county_fips": "50025",
          "county_name": "Windham",
          "isActive": false,
          "dist": 0,
          "price": 4.829
      },
      {
          "zip": "06450",
          "lat": 41.53332,
          "lng": -72.77399,
          "city": "Meriden",
          "state_id": "CT",
          "state_name": "Connecticut",
          "county_fips": "09009",
          "county_name": "New Haven",
          "isActive": false,
          "dist": 0,
          "price": 4.749
      },
      {
          "zip": "11729",
          "lat": 40.76249,
          "lng": -73.32161,
          "city": "Deer Park",
          "state_id": "NY",
          "state_name": "New York",
          "county_fips": "36103",
          "county_name": "Suffolk",
          "isActive": false,
          "dist": 0,
          "price": 4.670000000000001
      },
      {
          "zip": "17604",
          "lat": 40.0577,
          "lng": -76.33731,
          "city": "Lancaster",
          "state_id": "PA",
          "state_name": "Pennsylvania",
          "county_fips": "42071",
          "county_name": "Lancaster",
          "isActive": false,
          "dist": 0,
          "price": 4.55
      },
      {
          "zip": "17604",
          "lat": 40.0577,
          "lng": -76.33731,
          "city": "Lancaster",
          "state_id": "PA",
          "state_name": "Pennsylvania",
          "county_fips": "42071",
          "county_name": "Lancaster",
          "isActive": false,
          "dist": 0,
          "price": 4.55
      },
      {
          "zip": "21013",
          "lat": 39.51123,
          "lng": -76.49124,
          "city": "Baldwin",
          "state_id": "MD",
          "state_name": "Maryland",
          "county_fips": "24005",
          "county_name": "Baltimore",
          "isActive": false,
          "dist": 0,
          "price": 4.19
      }
  ];
  }
}
