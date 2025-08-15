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
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Search),
      multi: true
    }
  ]
})
export class Search implements ControlValueAccessor {
  @Output() inputChange = new EventEmitter<string>();

  searchValue: string = '';
  disabled = false;

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.searchValue = value ?? '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchValue = value;
    this.onChange(value);
    this.inputChange.emit(value);
  }
}
