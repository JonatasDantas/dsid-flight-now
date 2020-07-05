import { Component, OnInit, Input } from '@angular/core';
import { Flight } from '../../../models/flight.model';

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

  getImagePath() {
    return this.flight.imgUrl ? this.flight.imgUrl : "/assets/img/airplane.jpg";
  }


  favorite() {
    this.favorited = !this.favorited;
  }

}
