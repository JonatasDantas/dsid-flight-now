import { Component, OnInit, Input } from '@angular/core';
import { Flight } from '../../../models/flight.model';
import { Cotacao } from '../../../skyscanner-api/skyscanner.model';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.scss']
})
export class TripCardComponent implements OnInit {

  @Input() flight: Cotacao;
  favorited: boolean;
  ida: boolean = true;

  constructor() { }

  ngOnInit(): void {
   
  }

  getImagePath() {
    return "/assets/img/airplane.jpg";
  }

  revelaVolta(boolean: boolean) {    
    this.ida = !boolean;
  }

  favorite() {
    this.favorited = !this.favorited;
  }

}
