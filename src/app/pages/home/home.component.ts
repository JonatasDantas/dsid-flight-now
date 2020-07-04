import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { Flight } from './trip-card/trip.model';
import { FlightService } from '../../@core/data/flightService';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { finalize } from 'rxjs/operators';
import { NbDialogService } from '@nebular/theme';

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

  constructor(
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

  submit(e: any, dialog: TemplateRef<any>) {
    this.dialogService.open(dialog)
  }

  openDialog(dialog: TemplateRef<any>, flight: Flight) {

    this.dialogService.open(dialog, {
      context: {
        ...flight
      }
    })
  }

  ngOnDestroy(){
    this.divColumns[0].classList.remove('home-page');
  }
 
}
