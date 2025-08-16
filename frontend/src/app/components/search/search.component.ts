import { Component, forwardRef, EventEmitter, Output } from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  template: `
    <input
      class="search-bar"
      type="text"
      [ngModel]="searchValue"
      [value]="searchValue"
      (input)="onInput($event)"
      (blur)="onTouched()"
      [disabled]="disabled"
      placeholder="Rechercher"
    >
  `,
  styles: [`
    .search-bar {
      width: 100%;
      padding: 8px 12px;
      font-size: 14px;
    }
  `],
  imports: [
    FormsModule
  ],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchComponent),
      multi: true
    }
  ]
})
export class SearchComponent implements ControlValueAccessor {
  @Output() inputChange = new EventEmitter<string>();

  public searchValue = '';
  public disabled = false;

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  public writeValue(value: string): void {
    this.searchValue = value ?? '';
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchValue = value;
    this.onChange(value);
    this.inputChange.emit(value);
  }
}
