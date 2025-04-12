import {
  Component,
  effect,
  input,
  linkedSignal,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  search = output<string>();
  placeHolder = input<string>('Buscar');
  debounceTime = input<number>(500);
  initialValue = input<string>();
  inputValue = linkedSignal<string>(() => this.initialValue() ?? '');

  deboundeEffect = effect((onCleanup) => {
    const value = this.inputValue();
    const timeout = setTimeout(() => {
      this.search.emit(value);
    }, this.debounceTime());

    onCleanup(() => {
      clearTimeout(timeout);
    });
  });
}
