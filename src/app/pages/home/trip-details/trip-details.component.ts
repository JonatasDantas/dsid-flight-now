import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Flight } from '../../../models/flight.model';
import { UserService } from '../../../@core/data/userService';
import { FlightService } from '../../../@core/data/flightService';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss']
})
export class TripDetailsComponent implements OnInit {

  loading = false;

  @Input() flight: Flight;
  @Input() adults: number;
  @Input() kids: number;
  @Output() adquirirCreditos: EventEmitter<void> = new EventEmitter();
  @Output() confirm = new EventEmitter()

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


  constructor(
    private userService: UserService,
    private flightService: FlightService) { }

  ngOnInit(): void {
    console.log(this.flight);

  }

  getImagePath() {
    return this.flight.imgUrl ? this.flight.imgUrl : "/assets/img/airplane.jpg";
  }


  calculatePrice() {
    return this.flight.cost * (this.adults + this.kids / 2)
  }

  adquirirMaisEmit() {
    this.adquirirCreditos.emit()
  }

  comprarVoo() {
    this.loading = true;
    this.flightService.buyFlight({
      adultos: this.adults,
      criancas: this.kids,
      poltrona: 4,
      vooId: this.flight.id,
      usuarioId: this.userService.userData.id
    }).subscribe(
      data => {
        console.log(data);
        this.loading = false;
        this.userService.setUser(data.usuario)
        this.confirm.emit();
      },
      error => {
        console.error(error);
        this.loading = false;
      }
    )
  }

}
