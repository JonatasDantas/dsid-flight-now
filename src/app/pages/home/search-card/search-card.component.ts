import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.scss']
})
export class SearchCardComponent implements OnInit {

  constructor() { }

  @Output() submit = new EventEmitter();
  
  emit() {
    this.submit.emit()
  }

  quantidadeAdultos = 1;
  quantidadeCriancas = 0;

  ngOnInit(): void {
  }

}
