import { Component, OnInit, Input } from '@angular/core';
import { Flight } from './trip.model';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.scss']
})
export class TripCardComponent implements OnInit {

  @Input() flight: Flight;
  favorited: boolean;

  constructor() { }

  ngOnInit(): void {
   
  }

  favorite() {
    this.favorited = !this.favorited;
  }

}
