import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface SortOption {
  label: string;
  value: string;
  icon?: string;
}

@Component({
  selector: 'app-sort-buttons',
  templateUrl: './sort-buttons.html',
  styleUrls: ['./sort-buttons.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SortButtonsComponent),
      multi: true
    }
  ]
})
export class SortButtonsComponent implements ControlValueAccessor {

  @Input() options: SortOption[] = [];
  @Output() selectionChange = new EventEmitter<string>();

  selectedValue: string | null = null;

  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.selectedValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  selectOption(option: SortOption) {
    if (this.selectedValue === option.value) return;
    this.selectedValue = option.value;
    this.onChange(this.selectedValue);
    this.onTouched();
    this.selectionChange.emit(this.selectedValue);
  }
}
