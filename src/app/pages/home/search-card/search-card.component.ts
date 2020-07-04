import { Component, OnInit, Output, EventEmitter } from '@angular/core';

export interface SearchOutput {
  exitDate: Date;
  backDate: Date;
  adults: number;
  kids: number;
}
  @Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.scss']
})
export class SearchCardComponent implements OnInit {

  constructor() { }

  @Output() submit = new EventEmitter<SearchOutput>();
  public filters = {
    exitDate: new Date(),
    backDate: new Date(),
  };

  emit() {
    this.submit.emit(
      {
        exitDate: this.filters.exitDate,
        adults: this.quantidadeAdultos,
        kids: this.quantidadeCriancas,
        backDate: this.filters.backDate,
      }
    )
  }

  quantidadeAdultos = 1;
  quantidadeCriancas = 0;

  ngOnInit(): void {
  }

}
