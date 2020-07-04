import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { FlightService } from '../../@core/data/flightService';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { finalize } from 'rxjs/operators';
import { NbDialogService } from '@nebular/theme';
import { Flight } from '../../models/flight.model';
import { FormBuilder } from '@angular/forms';
import { SearchOutput } from './search-card/search-card.component';

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

  constructor(
    private fb: FormBuilder,
    private flightService: FlightService,
    private dialogService: NbDialogService,
  ) { }

  ngOnInit() {

    this.divColumns = document.getElementsByClassName('columns');
    this.divColumns[0].classList.add('home-page');

    this.flightService.getFlights().pipe(
      untilDestroyed(this),
      finalize(() => this.isLoading = false),
    ).subscribe({
      next: (response) => {
        this.flights = response;

        console.log(this.flights);
      }
    });
  }

  submit(e: SearchOutput, dialog: TemplateRef<any>) {
    this.adults = e.adults;
    this.kids = e.kids;
  }

  openDialog(dialog: TemplateRef<any>, flight: Flight) {

    this.dialogService.open(dialog, {
      context: {
        flight,
        adults: this.adults,
        kids: this.kids
      }
    })
  }

  ngOnDestroy(){
    this.divColumns[0].classList.remove('home-page');
  }
 
}
