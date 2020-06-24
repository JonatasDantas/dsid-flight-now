import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-ngx-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {

  divColumns: any;

  constructor(
  ) { }

  ngOnInit() {
    this.divColumns = document.getElementsByClassName('columns');
    this.divColumns[0].classList.add('home-page');
  }

  ngOnDestroy(){
    this.divColumns[0].classList.remove('home-page');
  }
 
}
