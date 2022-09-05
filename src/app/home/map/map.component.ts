import { Component, OnChanges, OnDestroy, Input } from '@angular/core';
import {
  map,
  Map,
  layerGroup,
  tileLayer,
  TileLayer,
  geoJSON,
  marker,
  icon,
} from 'leaflet';
import { FeatureCollection, GeoJSON } from 'geojson';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnChanges, OnDestroy {
  @Input() data: any;
  @Input() loaded: any;

  private map: Map | any;
  private borders: GeoJSON | any;
  private cytiesMarkers = layerGroup();
  private myIcon = icon({
    iconUrl: 'assets/icon/pin.png',
    iconSize: [32, 32],
    tooltipAnchor: [0, -8],
  });

  private initMap(): void {
    this.map = map('map', { center: [39.8282, -98.5795], zoom: 3 });
    const tiles: TileLayer = tileLayer(
      'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    ).addTo(this.map);
  }

  private makePoint(data: any[], map: Map): void {
    if (this.cytiesMarkers.getLayers().length > 0)
      this.cytiesMarkers.clearLayers();
    const circleBounds = [];
    // Create city markers
    data.forEach((element) => {
      const lng = element.lng;
      const lat = element.lat;
      const price = element.price.toString();
      let parsedPrice =
        price.indexOf('.') !== -1 ? price.split('.') : [price, '000'];
      if (parsedPrice[1].length <= 3)
        while (parsedPrice[1].length <= 3) {
          parsedPrice[1] = parsedPrice[1] + '0';
        }
      parsedPrice = [
        parsedPrice[0],
        parsedPrice[1].substring(0, 2),
        parsedPrice[1].substring(2, 3),
      ];
      console.log(parsedPrice);
      circleBounds.push([lat, lng]);
      const circle = marker([lat, lng], {
        icon: this.myIcon,
      })
        .bindTooltip(
          `<div class="leaflet-tooltip-wrapper"> 
              <div class="leaflet-tooltip-title">${element.city}</div>
              <div class="leaflet-tooltip-content"> 
                <small>$</small> 
                <span>${parsedPrice[0]}.${parsedPrice[1]}</span>
                <small>${parsedPrice[2]}</small>
              </div>
            </div>`,
          { direction: 'top', permanent: true }
        )
        .openTooltip();
      this.cytiesMarkers.addLayer(circle);
    });
    this.cytiesMarkers.addTo(map);
    map.fitBounds(circleBounds);
  }
  private makePolygons(data: any[], map: Map): void {
    if (this.borders) this.borders.remove();

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
