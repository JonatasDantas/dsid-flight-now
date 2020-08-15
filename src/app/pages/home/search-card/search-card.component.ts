import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { SkyscannerService } from '../../../skyscanner-api/skyscanner.service';
import { filter, debounceTime, switchMap, map, tap, startWith, distinctUntilChanged } from 'rxjs/operators';

export interface SearchOutput {
  exitDate: Date;
  exitLocation: string;
  backDate?: Date;
  backLocation?: string;
  adults: number;
  kids: number;
  soIda: boolean;
}

export const carregandoObjeto = 
  [{name: 'carregando', children: [
  { name: 'carregando destinos', codigo: 'SAOA-SKY' },     
  ]
}]
@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.scss']
})
export class SearchCardComponent implements OnInit {

  loadingPlaces = true;
  filteredArriveLocation$: Observable<{ name: string; children: any[]; }[] | { name: string; children: { name: string; }[]; }[]>;
  firstExitLocationItem: { name: string; codigo: string; };
  soIda: boolean;
  
  constructor(private skyscannerService: SkyscannerService) { }
  
  @Output() submit = new EventEmitter<SearchOutput>();
  
  public filters = {
    exitDate: new Date(),
    backDate: new Date(),
  };

  handleValue = (value) => value?.name || value;
  
  exitLocation = new FormControl('SAOA-sky');
  backLocation = new FormControl('BR-sky');
  filteredExitLocation$: Observable<
  {
    name: string, children: any[]
  }[]>;
  
  selectedBackLocation: {name: string, codigo: string};
  selectedExitLocation: {name: string, codigo: string}

  emit() {
    this.submit.emit(
      {
        exitLocation: this.exitLocation.value.replace(/.*?- /, ''),
        backLocation: this.backLocation.value.replace(/.*?- /, ''),
        exitDate: this.filters.exitDate,
        adults: this.quantidadeAdultos,
        kids: this.quantidadeCriancas,
        backDate: this.filters.backDate,
        soIda: this.soIda,
      }
    )
  }

  quantidadeAdultos = 1;
  quantidadeCriancas = 0;

  ngOnInit(): void {
    this.filters.backDate.setDate(this.filters.backDate.getDate() + 7)
    this.filteredExitLocation$ = this.getListaFiltrada(this.exitLocation);
    this.filteredArriveLocation$ = this.getListaFiltrada(this.backLocation);
  }

  changeSoIda(event) {    
    if (event.target.checked) {
      this.backLocation.disable()
      return;
    }
    this.backLocation.enable()
  }

  checkTudoOk() {
    return /\w\w-sky$/.test(this.exitLocation.value) && /\w\w-sky$/.test(this.backLocation.value)
  }

  private getListaFiltrada(input: FormControl) {
    return input.valueChanges.pipe(
      filter(e => e?.length >= 2),
      distinctUntilChanged(),
      debounceTime(500),
      tap(_ => this.loadingPlaces = true),
      switchMap((e) => this.skyscannerService.getPlaces(e).pipe(
        map(el => el.map(e => ({
          name: e.CountryName,
          option: { name: e.PlaceName, codigo: e.PlaceId }
        }))),
        map(e => {
          const newArr: { name: string; children: any[]; }[] = [];
          e.forEach(el => {
            const foundEl = newArr.find(e => e.name === el.name);
            if (!foundEl) {
              newArr.push({ name: el.name, children: [el.option] });
            }
            else {
              foundEl.children.push(el.option);
            }
          });
          return newArr;
        }),        
        tap(e => {
          this.loadingPlaces = false;
          console.log(e);
          
          this.firstExitLocationItem = e[0]?.children[0];
        }),
        startWith(carregandoObjeto)
      ),
      ));
  }

  
  trackByExit(index, item) {
    return item.name;
  }

  trackByArrive(index, item) {
    return item.name;
  }

}
