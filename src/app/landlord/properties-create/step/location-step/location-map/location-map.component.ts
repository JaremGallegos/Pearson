import { Component, inject, Output, EventEmitter, OnInit, input, effect, ElementRef } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AutoCompleteCompleteEvent, AutoCompleteModule, AutoCompleteSelectEvent } from "primeng/autocomplete";
import { CountryService } from '../country.service';
import { ToastService } from '../../../../../layout/toast.service';
import { Country } from '../country.model';
import { filter } from 'rxjs';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Overlay from 'ol/Overlay';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-location-map',
  standalone: true,
  imports: [
    FontAwesomeModule,
    FormsModule,
    AutoCompleteModule
  ],
  templateUrl: './location-map.component.html',
  styleUrls: ['./location-map.component.scss']
})

export class LocationMapComponent implements OnInit {

  countryService = inject(CountryService);
  toastService = inject(ToastService);

  private map: Map | undefined;
  private markerOverlay: Overlay | undefined;

  location = input.required<string>();
  placeholder = input<string>("Selecciona el País de Destino");

  currentLocation: Country | undefined;

  @Output()
  locationChange = new EventEmitter<string>();

  formatLabel = (country: Country) => country.flag + "   " + country.name.common;

  countries: Array<Country> = [];
  filteredCountries: Array<Country> = [];

  constructor(private elementRef: ElementRef) {
    this.listenToLocation();
  }

  ngOnInit(): void {
    this.initializeMap();
  }

  private initializeMap() {
    this.map = new Map({
      target: this.elementRef.nativeElement.querySelector('#map'),
      layers: [
        new TileLayer({
          source: new OSM(), 
        }),
      ],
      view: new View({
        center: fromLonLat([-77.0428, -12.0464]),
        zoom: 5,
      }),
    });

    this.markerOverlay = new Overlay({
      element: document.getElementById('marker')!,
      positioning: 'bottom-center',
      stopEvent: false,
    });

    this.markerOverlay.setPosition(fromLonLat([-77.0428, -12.0464])); 
    this.map.addOverlay(this.markerOverlay);
  }

  onLocationChange(newEvent: AutoCompleteSelectEvent) {
    const newCountry = newEvent.value as Country;
    this.locationChange.emit(newCountry.cca3);
  }

  private listenToLocation() {
    effect(() => {
      const countriesState = this.countryService.countries();
      if(countriesState.status === "OK" && countriesState.value) {
        this.countries = countriesState.value;
        this.filteredCountries = countriesState.value;
        this.changeMapLocation(this.location())
      } else if (countriesState.status === "ERROR") {
        this.toastService.send({
          severity: "error", summary: "Error",
          detail: "Algo estuvo mal al momento de escoger el país y seleccionar la locacion"
        });
      }
    });
  }

  private changeMapLocation(countryCode: string) {
    this.currentLocation = this.countries.find(country => country.cca3 === countryCode);
    if (this.currentLocation) {
      const lonLat = fromLonLat([this.currentLocation.latlng[1], this.currentLocation.latlng[0]]);
      this.map!.getView().setCenter(lonLat);
      this.map!.getView().setZoom(13);
      this.markerOverlay!.setPosition(lonLat);
    }
  }



  search(newCompleteEvent: AutoCompleteCompleteEvent): void {
    this.filteredCountries =
      this.countries.filter(country => country.name.common.toLowerCase().startsWith(newCompleteEvent.query));
  }

  protected readonly filter = filter;
}
