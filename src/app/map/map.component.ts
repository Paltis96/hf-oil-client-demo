import { Component, AfterViewInit, OnChanges, Input } from '@angular/core';
import { map, tileLayer, geoJSON, Map, TileLayer, popup } from 'leaflet';
import { FeatureCollection } from 'geojson';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit, OnChanges {
  @Input() data: any;

  private collection: FeatureCollection = {
    type: 'FeatureCollection',
    features: [],
  };
  private map: Map | any;

  private initMap(): void {
    this.map = map('map', { center: [39.8282, -98.5795], zoom: 3 });
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

  makePolygons(res: any[], map: Map): void {
    if (!res) return undefined;
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
  }
  ngAfterViewInit(): void {
    this.initMap();
  }
  ngOnChanges(): void {
    this.makePolygons(this.data, this.map);
  }
}
