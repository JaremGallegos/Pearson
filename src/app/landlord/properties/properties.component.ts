import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { CardListingComponent } from '../../shared/card-listing/card-listing.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { LandlordListingService } from '../landlord-listing.service';
import { ToastService } from '../../layout/toast.service';
import { CardListing } from '../model/listing.model';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [
    CardListingComponent,
    FaIconComponent
  ],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.scss'
})
export class PropertiesComponent implements OnInit, OnDestroy {
  landlordListingService = inject(LandlordListingService);
  toastService = inject(ToastService)

  listings: Array<CardListing> | undefined = [];
  loadingDeletion = false;
  loadingFetchAll = false;

  constructor() {
    this.listenFetchAll();
    this.listenDeleteByPublicId();
  }

  private listenFetchAll() {
    effect(() => {
      const allListingState = this.landlordListingService.getAllSig();
      if (allListingState.status === "OK" && allListingState.value) {
        this.loadingFetchAll = false;
        this.listings = allListingState.value;
      } else if (allListingState.status === "ERROR") {
        this.toastService.send({
          severity: "error", summary: "Error", detail: "Error al tratar de mapear el listado",
        });
      }
    });
  }

  private listenDeleteByPublicId() {
    effect(() => {
      const deleteState = this.landlordListingService.deleteSig();
      if (deleteState.status === "OK" && deleteState.value) {
        const listingToDeleteIndex = this.listings?.findIndex(listing => listing.publicId === deleteState.value);
        this.listings?.splice(listingToDeleteIndex!, 1);
        this.toastService.send({
          severity: "success", summary: "Se Eliminó Correctamente", detail: "Se Eliminó la Habitación Deseada.",
        });
      } else if (deleteState.status === "ERROR") {
        const listingToDeleteIndex = this.listings?.findIndex(listing => listing.publicId === deleteState.value);
        this.listings![listingToDeleteIndex!].loading = false;
        this.toastService.send({
          severity: "error", summary: "Error", detail: "Se Produjo un Error al Tratar de Eliminar una Habitación.",
        });
      }
      this.loadingDeletion = false;
    });
  }

  ngOnDestroy(): void {
      
  }

  ngOnInit(): void {
    this.fetchListings()
  }

  onDeleteListing(listing: CardListing): void {
    listing.loading = true;
    this.landlordListingService.delete(listing.publicId);
  }

  private fetchListings() {
    this.loadingFetchAll = true;
    this.landlordListingService.getAll();
  }
}
