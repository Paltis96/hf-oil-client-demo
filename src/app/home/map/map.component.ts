import { Component, OnChanges, OnDestroy, Input } from '@angular/core';
import { map, Map, tileLayer, TileLayer, geoJSON, circleMarker } from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { FeatureCollection, GeoJSON } from 'geojson';
import {
  point,
  featureCollection,
  distance,
  bearingToAzimuth,
  bearing,
  featureEach,
} from '@turf/turf';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnChanges, OnDestroy {
  constructor(private http: HttpClient) { }

  @Input() data: any;
  @Input() loaded: any;

  public uid = Date.now().toString();

  private map: Map | any;
  private borders: FeatureCollection | any;
  private tooltips: FeatureCollection | any;

  initMap(): void {
    this.map = map(this.uid, { center: [39.8282, -98.5795], zoom: 3, maxZoom: 14 });
    const tiles: TileLayer = tileLayer(
      'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 14,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    ).addTo(this.map);
    this.getStates(this.map);
    this.tooltips = geoJSON(this.pointsToGeoJson(this.data), {
      onEachFeature: (feature, layer) => {
        this.map.on('zoomend', () => {
          const props = feature.properties;
          const city = props.city;
          const price = props.parsedPrice;
          layer
            .bindTooltip(
              `<div class="leaflet-tooltip-wrapper"> 
                <div class="leaflet-tooltip-title">${city}</div>
                <div class="leaflet-tooltip-content"> 
                  <small>$</small> 
                  <span>${price[0]}.${price[1]}</span>
                  <small>${price[2]}</small>
                </div>
              </div>`,
              {
                direction: this.data.length >= 2 ? this.getDir(props.distMatrix[0]) : 'center',
                permanent: true,
              }
            )
            .openTooltip();
        });
      },
      pointToLayer: function (_, latlng) {
        return circleMarker(latlng, {
          radius: 0,
          opacity: 0,
        });
      },
    }).addTo(this.map);
    this.map.fitBounds(this.tooltips.getBounds(), { padding: [50, 50] });
  }
  getDir = (data: any[]) => {

    const [idx, dist, azimuth] = data;

    let direction = '';
    const metresPerPixel =
      (40075016.686 *
        Math.abs(Math.cos((this.map.getCenter().lat * Math.PI) / 180))) /
      Math.pow(2, this.map.getZoom() + 8);

    if (dist < metresPerPixel * 100) {
      if (azimuth >= 315 || azimuth <= 45) {
        direction = 'bottom';
      } else if (azimuth >= 45 && azimuth <= 135) {
        direction = 'left';
      } else if (azimuth >= 135 && azimuth <= 225) {
        direction = 'top';
      } else if (azimuth >= 225 && azimuth <= 315) {
        direction = 'right';
      }
    } else {
      direction = 'center';
    }

    return direction;
  };
  getStates(map: Map) {
    this.http.get('assets/us_state.json').subscribe((json: any) => {
      this.borders = geoJSON(json, {
        style: { weight: 1, opacity: 0.5, color: '#0E8BDE', fill: false },
      }).addTo(map);
    });
  }
  pointsToGeoJson(data: any[]) {
    const pointList = [];
    data.forEach((item) => {
      let parsedPrice =
        item.price.toString().indexOf('.') !== -1
          ? item.price.toString().split('.')
          : [item.price, '000'];
      if (parsedPrice[1].length <= 3)
        while (parsedPrice[1].length <= 3) {
          parsedPrice[1] = parsedPrice[1] + '0';
        }
      parsedPrice = [
        parsedPrice[0],
        parsedPrice[1].substring(0, 2),
        parsedPrice[1].substring(2, 3),
      ];
      const p = point([item.lng, item.lat], { ...item, parsedPrice });
      pointList.push(p);
    });

    const collection = featureCollection(pointList);

    featureEach(collection, function (firstFeature, firstIndex) {
      const props = firstFeature.properties;
      const distMatrix = (props.distMatrix = []);
      featureEach(collection, function (secondFeature, secondIndex) {
        const dist = distance(firstFeature as any, secondFeature as any, {
          units: 'meters',
        });
        const azimuth = bearingToAzimuth(
          bearing(firstFeature as any, secondFeature as any)
        );
        distMatrix.push([secondIndex, dist, azimuth]);
      });

      distMatrix.sort((a, b) => {
        return a[1] - b[1];
      });
      props.distMatrix = distMatrix.filter((item) => {
        return item[1] != 0;
      });
    });
    return collection;
  }
  ngOnChanges() {
    if (this.loaded && !this.map) this.initMap();
  }
  ngOnDestroy(): void {
    this.map.remove();
  }
}
