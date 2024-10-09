import { Component, EventEmitter, input, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InputTextModule } from 'primeng/inputtext';
import { PrecioVO } from '../../../model/listing-vo.model';

@Component({
  selector: 'app-price-step',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    FontAwesomeModule
  ],
  templateUrl: './price-step.component.html',
  styleUrl: './price-step.component.scss'
})
export class PriceStepComponent {
  price = input.required<PrecioVO>();

  @Output()
  priceChange = new EventEmitter<PrecioVO>;

  @Output()
  stepValidityChange = new EventEmitter<boolean>();

  @ViewChild("formPrice")
  formPrice: NgForm | undefined;

  onPriceChange(newPrice: number) {
    this.priceChange.emit({value: newPrice});
    this.stepValidityChange.emit(this.validateForm());
  }

  private validateForm() {
    if (this.formPrice) {
      return this.formPrice?.valid!;
    } else {
      return false;
    }
  }
}
