import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface SortOption {
  label: string;
  value: string;
  icon?: string;
}

@Component({
  selector: 'app-sort-buttons',
  template: `
    <div class="sort-buttons">
      @for (opt of options; track opt) {
        <button class="sort-button"
                [class.selected]="opt.value === selectedValue"
                (click)="selectOption(opt)">
          @if (opt.icon) {
            <svg>
              <use [attr.href]="'/icons/_icons.svg#'+opt.icon"></use>
            </svg>
          }
          {{ opt.label }}
        </button>
      }
    </div>
  `,
  styles: [`
    .sort-buttons {
      display: flex;
      gap: 8px;
      margin: 0 16px;
    }
  `],
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
