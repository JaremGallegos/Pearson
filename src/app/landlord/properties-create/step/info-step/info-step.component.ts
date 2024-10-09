import { Component, input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from 'primeng/button';
import { NewListingInfo } from '../../../model/listing.model';
import { InfoStepControlComponent } from "./info-step-control/info-step-control.component";

export type Control = "HUESPEDES" | "CUARTOS" | "CAMAS" | "BANOS"

@Component({
  selector: 'app-info-step',
  standalone: true,
  imports: [FormsModule, ButtonModule, FontAwesomeModule, InfoStepControlComponent],
  templateUrl: './info-step.component.html',
  styleUrl: './info-step.component.scss'
})
export class InfoStepComponent {
  infos = input.required<NewListingInfo>();

  @Output()
  infoChange = new EventEmitter<NewListingInfo>();

  @Output()
  stepValidityChange = new EventEmitter<boolean>();

  onInfoChange(newValue: number, valueType: Control) {
    switch (valueType) {
      case "BANOS":
        this.infos().baths = {value: newValue}
        break;
      case "CUARTOS":
        this.infos().bedrooms = {value: newValue}
        break;
      case "CAMAS":
        this.infos().beds = {value: newValue}
        break;
      case "HUESPEDES":
        this.infos().guests = {value: newValue}
        break;
    }

    this.infoChange.emit(this.infos());
    this.stepValidityChange.emit(this.validationRules())
  }

  validationRules(): boolean {
    return this.infos().guests.value >= 1;
  }
}
