import { Component, OnInit } from '@angular/core';
import { FlightService } from '../../@core/data/flightService';
import { UserService } from '../../@core/data/userService';
import { Flight } from '../../models/flight.model';
import { Compra } from '../../models/compra.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Cotacao } from '../../skyscanner-api/skyscanner.model';

@Component({
  selector: 'app-user-flights',
  templateUrl: './user-flights.component.html',
  styleUrls: ['./user-flights.component.scss']
})
export class UserFlightsComponent implements OnInit {

  constructor(private fligthService: FlightService,
    private userService: UserService) { }
  
  flights$: Observable<(Flight & Compra)[]>

  ngOnInit(): void {
    this.flights$ = this.fligthService.getUserFlights(this.userService.userData.id).pipe(
      tap(console.log)
    )
  }

}
