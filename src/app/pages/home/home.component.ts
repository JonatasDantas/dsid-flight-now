import { Component, OnInit, OnDestroy } from '@angular/core';
import { Flight } from './trip-card/trip.model';

@Component({
  selector: 'app-ngx-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {

  divColumns: any;

  flights: [Flight];

  constructor(
  ) { }

  ngOnInit() {
    this.divColumns = document.getElementsByClassName('columns');
    this.divColumns[0].classList.add('home-page');

    fetch('https://jsonplaceholder.typicode.com/albums/3/photos').
    then(res => {
      (res.json() as Promise<[Flight]>).then(
        e => {
          this.flights = e;
        }
      )
    })
  }

  submit(e: any) {

  }

  ngOnDestroy(){
    this.divColumns[0].classList.remove('home-page');
  }
 
}
