import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Flight } from '../../../models/flight.model';
import { UserService } from '../../../@core/data/userService';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss']
})
export class TripDetailsComponent implements OnInit {

  @Input() flight: Flight;
  @Input() adults: number;
  @Input() kids: number;
  @Output() adquirirCreditos: EventEmitter<void> = new EventEmitter();

  get credits() {
    return this.userService.userData.credits
  }

  get textAdults() {
    return this.adults > 1 ?
      `${this.adults} adultos` :
      `${this.adults} adulto`
  }


  get textKids() {
    if (this.kids === 0) return
    return this.kids > 1 ?
      ` e ${this.kids} crianças` :
      ` e ${this.kids} criança`
  }

  get userCredits() {
    return this.userService.userData.credits;
  }

  get saldoPositivo() {
    return this.credits >= this.flight.cost;
  }


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    console.log(this.flight);

  }

  getImagePath() {
    if (this.flight.imgName) {
      return this.flight.imgName ? `/assets/img/${this.flight.imgName}.jpg` : "/assets/img/airplane.jpg";
    }
    return this.flight.imgUrl
  }


  calculatePrice() {
    return this.flight.cost * (this.adults + this.kids / 2)
  }

  adquirirMaisEmit() {
    this.adquirirCreditos.emit()
  }

}
