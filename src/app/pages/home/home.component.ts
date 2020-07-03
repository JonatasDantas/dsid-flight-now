import { Component, OnInit, OnDestroy } from '@angular/core';
import { Flight } from './trip-card/trip.model';
import { FlightService } from '../../@core/data/flightService';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { finalize } from 'rxjs/operators';

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

  submit(e: any) {

  }

  ngOnDestroy(){
    this.divColumns[0].classList.remove('home-page');
  }
 
}
