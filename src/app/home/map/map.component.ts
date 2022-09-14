import { Component, OnChanges, OnDestroy, Input } from '@angular/core';
import {
  map,
  Map,
  layerGroup,
  tileLayer,
  TileLayer,
  geoJSON,
  circleMarker,
  // Marker
  // icon,
} from 'leaflet';
import { FeatureCollection, GeoJSON } from 'geojson';
import { point, distance, bearingToAzimuth, bearing } from '@turf/turf';

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

  // private myIcon = icon({
  //   iconUrl: 'assets/icon/pin.png',
  //   iconSize: [32, 32],
  //   tooltipAnchor: [0, -8],
  // });

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
  private calcDirection(data: any[]) {
    const metresPerPixel =
      (40075016.686 *
        Math.abs(Math.cos((this.map.getCenter().lat * Math.PI) / 180))) /
      Math.pow(2, this.map.getZoom() + 8);

    const processedData: any = [];
    let direction = '';
    data.forEach((first, index) => {
      const firstPoint = point([first.lng, first.lat]);
      processedData[index] = [];
      data.forEach((second) => {
        if (first.zip !== second.zip) {
          const secondPoint = point([second.lng, second.lat]);
          const dist = distance(firstPoint, secondPoint, { units: 'meters' });

          if (dist < metresPerPixel * 100) {
            const azimuth = bearingToAzimuth(bearing(firstPoint, secondPoint));
            if (azimuth >= 315 && azimuth <= 45) {
              direction = 'bottom';
            } else if (azimuth >= 45 && azimuth <= 135) {
              direction = 'left';
            } else if (azimuth >= 135 && azimuth <= 225) {
              direction = 'right';
            } else if (azimuth >= 225 && azimuth <= 315) {
              direction = 'top';
            }
            processedData[index].push({ ...first, direction, dist });
          } else {
            direction = 'center';
            processedData[index].push({ ...first, direction, dist });
          }
        }
      });
    });

    return processedData.map((element) => {
      return element.sort(function (a, b) {
        return a.dist - b.dist;
      })[0];
    });
  }
  private fitToBoubds = (data: any) => {
    const circleBounds = [];
    // Create city markers
    data.forEach((element) => {
      const lng = element.lng;
      const lat = element.lat;
      circleBounds.push([lat, lng]);
    });
    this.map.fitBounds(circleBounds);
  };
  private async makePoint(data: any[], map: Map) {
    if (this.cytiesMarkers.getLayers().length > 0)
      this.cytiesMarkers.clearLayers();

    const points = this.calcDirection(data);
    console.log(points);
    points.forEach((element) => {
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
      const circle = circleMarker([lat, lng], {
        opacity: 0,
        fillOpacity: 0,
        radius: 0,
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
          { direction: element.direction, permanent: true }
        )
        .openTooltip();
      this.cytiesMarkers.addLayer(circle);
    });
    this.cytiesMarkers.addTo(map);
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

  async ngOnChanges() {
    if (this.loaded && !this.map) this.initMap();
    // if (this.map && this.data) this.makePolygons(this.data, this.map);
    if (this.map && this.data) {
      this.fitToBoubds(this.data);
      this.map.on('zoomend', () => {
        this.makePoint(this.data, this.map);
      });
    }
  }
  ngOnDestroy(): void {
    this.map.remove();
  }
}
