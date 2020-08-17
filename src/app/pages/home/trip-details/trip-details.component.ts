import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Flight } from '../../../models/flight.model';
import { UserService } from '../../../@core/data/userService';
import { FlightService } from '../../../@core/data/flightService';
import { NbDialogService } from '@nebular/theme';
import { GetCreditsComponent } from '../../user-infos/dialogs/get-credits/get-credits.component';
import { Cotacao } from '../../../skyscanner-api/skyscanner.model';
import { SkyscannerService } from '../../../skyscanner-api/skyscanner.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss']
})
export class TripDetailsComponent implements OnInit {

  loading = false;

  @Input() flight: Cotacao;
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
    return this.credits >= this.calculatePrice();
  }


  constructor(
    private dialogService: NbDialogService,
    private userService: UserService,
    private flightService: FlightService,
    private skyscannerService: SkyscannerService) { }

  ngOnInit(): void {
    console.log(this.flight);

  }

  getImagePath() {
    return "/assets/img/airplane.jpg";
  }


  calculatePrice() {
    return this.flight.precoAdulto * this.adults + this.flight.precoMeia * this.kids
  }

  adquirirMaisEmit() {
    
    const dialog = this.dialogService.open(GetCreditsComponent)

    dialog.componentRef.instance.complete.emit = () => {
      dialog.close()
    }

  }

  comprarVoo() {
    this.loading = true;
    this.skyscannerService.buyFlight({
      adultos: this.adults,
      criancas: this.kids,
      aeroportoChegada: this.flight.ida.aeroportoChegada,
      aeroportoSaida: this.flight.ida.aeroportoSaida,
      codigoAeroportoSaida: this.flight.ida.aeroportoSaida,
      codigoAeroportoChegada: this.flight.ida.aeroportoSaida,
      dataSaida: this.flight.ida.dataSaida,
      dataVolta: this.flight.volta.dataSaida,
      precoVoo: this.flight.precoAdulto,
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
