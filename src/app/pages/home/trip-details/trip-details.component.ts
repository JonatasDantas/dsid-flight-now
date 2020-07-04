import { Component, OnInit, Input } from '@angular/core';
import { Flight } from '../../../models/flight.model';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss']
})
export class TripDetailsComponent implements OnInit {

  @Input() flight: Flight;

  constructor() { }

  ngOnInit(): void {
    console.log(this.flight);
    
  }

}
