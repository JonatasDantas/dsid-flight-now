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
    if (this.flight.imgName) {
      return this.flight.imgName ? `/assets/img/${this.flight.imgName}.jpg` : "/assets/img/airplane.jpg";
    }
    return this.flight.imgUrl
  }


  favorite() {
    this.favorited = !this.favorited;
  }

}
