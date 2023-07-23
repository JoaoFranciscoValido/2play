import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  profile = null;

  public map!: mapboxgl.Map;
  public style = 'mapbox://styles/johnnyjump18/clk434cri00ge01pd5sabf9y6';

  public geojson = {
    'type': 'FeatureCollection',
    'features': [
      {
        'type': 'Feature',
        'properties': {
          'message': 'Foo',
          'iconSize': [50, 60]
        },
        'geometry': {
          'type': 'Point',
          'lng': [-9.114897605283069],
          'lat': [38.756166226698554]
        }
      },
    ]
  };

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    (mapboxgl as typeof mapboxgl).accessToken = environment.MAPBOX_KEY
  }

    async logout(){
      await this.authService.logout();
      this.router.navigateByUrl('/login', {replaceUrl: true});
    }

      
  ngOnInit() {
   
  }

  perfil(){
    this.router.navigateByUrl('/perfil',{replaceUrl: true});
  }

  ionViewWillEnter(){
    if(!this.map){
      this.buildMap();
    }
  }

  addMarker() {
    // Add markers to the map.
    for (const marker of this.geojson.features) {
      // Create a DOM element for each marker.
      const el = document.createElement('div');
      const width = marker.properties.iconSize[0];
      const height = marker.properties.iconSize[1];
      el.className = 'marker';
      el.style.backgroundImage = `url(https://media.discordapp.net/attachments/1036449115149697044/1129795055381655623/pngwing.com.png?width=${width}&height=${height})`;
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      el.style.backgroundSize = '100%';

      el.addEventListener('click', () => {
        this.router.navigateByUrl('/home',{replaceUrl: true});
      });

      // Add markers to the map.
      new mapboxgl.Marker(el)
        .setLngLat([marker.geometry.lng[0], marker.geometry.lat[0]],)
        .addTo(this.map);
    }
  }

  addGeoLoc() {
    // Add geolocate control to the map.
    var geoButton = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true
    })
    this.map.addControl(geoButton, 'bottom-right');
  }

    buildMap(){
      this.map = new mapboxgl.Map({
        container: 'mapa-box',
        style: this.style,
        zoom: 14,
        center: [
          -9.113520422527477, 
          38.755395757759,
        ]
      });
      this.addMarker();
      this.map.resize();
      this. addGeoLoc();
    }
}
