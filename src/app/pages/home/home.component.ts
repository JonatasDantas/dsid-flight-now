import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { FlightService } from '../../@core/data/flightService';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { finalize } from 'rxjs/operators';
import { NbDialogService, NbDialogRef } from '@nebular/theme';
import { Flight } from '../../models/flight.model';
import { FormBuilder } from '@angular/forms';
import { SearchOutput } from './search-card/search-card.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { start } from 'repl';

@Component({
  selector: 'app-ngx-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
  providers: [FlightService]
})
export class HomeComponent implements OnInit, OnDestroy {
  isLoading = false;
  divColumns: any;
  flights: any = [];

  adults: number;
  kids: number;
  dialog: NbDialogRef<TripDetailsComponent>;
  successDialog: NbDialogRef<unknown>;

  constructor(
    private fb: FormBuilder,
    private flightService: FlightService,
    private dialogService: NbDialogService,
  ) { }

  ngOnInit() {

    this.divColumns = document.getElementsByClassName('columns');
    this.divColumns[0].classList.add('home-page');

    this.flightService.getFlights(null, null).pipe(
      untilDestroyed(this),
      finalize(() => this.isLoading = false),
    ).subscribe({
      next: (response) => {
        this.flights = response;

        console.log(this.flights);
      }
    });
  }

  closeSuccessModal() {
    this.successDialog.close()
  }

  openSuccessModal(popup: any) {
    this.successDialog = this.dialogService.open(popup)
  }

  submit(e: SearchOutput) {
    console.log(e);
    
    this.isLoading = true
    return this.flightService.getFlights(e.exitDate, e.backDate).pipe(
      untilDestroyed(this),
      finalize(() => this.isLoading = false),
    ).subscribe({
      next: (response) => {
        this.adults = e.adults;
        this.kids = e.kids
        this.flights = response;
        console.log(this.flights);
      }
    });
  }

  openDialog(dialog: TemplateRef<any>, flight: Flight) {

    this.dialog = this.dialogService.open(dialog, {
      context: {
        flight,
        adults: this.adults,
        kids: this.kids
      }
    })
  }

  closeDialog(popup: any) {
    this.openSuccessModal(popup)
    this.dialog.close();
  }

  ngOnDestroy(){
    this.divColumns[0].classList.remove('home-page');
  }
 
}
