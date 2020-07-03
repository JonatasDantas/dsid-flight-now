import { Component, OnInit, Input } from '@angular/core';
import { Flight } from './trip.model';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.scss']
})
export class TripCardComponent implements OnInit {

  @Input() flight: any;
  favorited: boolean;

  constructor() { }

  ngOnInit(): void {
   
  }

  getImagePath() {
    return this.flight.imgName ? `/assets/img/${this.flight.imgName}.jpg` : "/assets/img/airplane.jpg";
  }

  favorite() {
    this.favorited = !this.favorited;
  }

}
