import { Component, EventEmitter, Inject, input, Output, PLATFORM_ID } from '@angular/core';
import { LocationMapComponent } from "./location-map/location-map.component";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-location-step',
  standalone: true,
  imports: [
    LocationMapComponent
  ],
  templateUrl: './location-step.component.html',
  styleUrl: './location-step.component.scss'
})
export class LocationStepComponent {
  location = input.required<string>();
  
  @Output()
  locationChange = new EventEmitter<string>();

  @Output()
  stepValidityChange = new EventEmitter<boolean>();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  onLocationChange(location: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.locationChange.emit(location);
      this.stepValidityChange.emit(true);
    }
  }
}
