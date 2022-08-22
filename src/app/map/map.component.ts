import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
} from '@angular/core';
import { map, tileLayer, geoJSON, Map, TileLayer, popup } from 'leaflet';
import { FeatureCollection } from 'geojson';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  @Input() lng: any;
  @Input() lat: any;

  private collection: FeatureCollection = {
    type: 'FeatureCollection',
    features: [],
  };
  private map: Map | any;

  constructor(private http: HttpClient) {}

  private initMap(): void {
    this.map = map('map', {});
    const tiles: TileLayer = tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    ).addTo(this.map);
  }

  makePolygons(map: Map): void {
    this.http
      .get(`http://127.0.0.1:8000/?lng=${this.lng}&lat=${this.lat}`)
      .subscribe((res: any) => {
        for (const obj of res) {
          const fiture = obj.geojson;
          fiture.properties = obj.min_price;
          this.collection.features.push(fiture);
        }
        const borders = geoJSON(this.collection, {
          onEachFeature: (feature, layer) => {
            layer
              .bindTooltip(`<b>$ ${feature.properties}</b>`, {
                direction: 'top',
                permanent: true,
              })
              .openTooltip();
          },
        });
        borders.addTo(map);
        map.fitBounds(borders.getBounds());
      });
  }
  ngAfterViewInit(): void {
    this.initMap();
    this.makePolygons(this.map);
  }
}
