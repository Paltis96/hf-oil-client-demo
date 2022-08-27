import { Component, OnChanges, OnDestroy, Input } from '@angular/core';
import { map, Map, tileLayer, TileLayer, geoJSON, circleMarker } from 'leaflet';
import { FeatureCollection, GeoJSON } from 'geojson';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnChanges, OnDestroy {
  @Input() data: any;
  @Input() loaded: any;

  private borders: GeoJSON | any;
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

  private makePoint(data: any[], map: Map): void {
    const circleBounds = [];
    data.forEach((element) => {
      const lng = element.lng;
      const lat = element.lat;
      circleBounds.push([lat, lng]);
      const circle = circleMarker([lat, lng], {
        radius: 7,
        fillOpacity: 1,
        fillColor: '#3388ff',
        color: '#fff',
      })
        .bindTooltip(
          `
        <div><b>city: </b>${element.city}</div>
        <div><b>zip:  </b>${element.zip}</div>`,
          { direction: 'top', permanent: false }
        )
        .openTooltip()
        .addTo(map);
      circle.on({
        mouseover: (e) => {
          e.target.setStyle({ radius: 10 });
        },
        mouseout: (e) => {
          e.target.setStyle({ radius: 7 });
        },
      });
    });
    map.fitBounds(circleBounds);
  }
  private makePolygons(data: any[], map: Map): void {
    const collection: FeatureCollection = {
      type: 'FeatureCollection',
      features: [],
    };
    // add geojson features data in collection
    data.forEach((element) => {
      const fiture = JSON.parse(element.geom);
      fiture.properties = element.min_price;
      collection.features.push(fiture);
    });
    if (this.borders) this.borders.remove();
    this.borders = geoJSON(collection, {
      onEachFeature: (feature, layer) => {
        layer
          .bindTooltip(`<b>$ ${feature.properties}</b>`, {
            direction: 'top',
            permanent: true,
          })
          .openTooltip();
      },
    }).addTo(map);
    map.fitBounds(this.borders.getBounds());
  }

  ngOnChanges(): void {
    if (this.loaded && !this.map) this.initMap();
    // if (this.map && this.data) this.makePolygons(this.data, this.map);
    if (this.map && this.data) this.makePoint(this.data, this.map);
  }
  ngOnDestroy(): void {
    this.map.remove();
  }
}
