import { Component, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  onSearch = output<string>();

  emitValue(value: string) {
    this.onSearch.emit(value);
  }
}
