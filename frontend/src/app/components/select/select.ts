import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Group} from '../../models/group.model';
import {JsonPipe} from '@angular/common';

export interface SelectOption {
  label: string;
  value: number;
}

@Component({
  selector: 'app-select',
  template: `
    {{options|json}}
    <select [ngModel]="selectedValue" (change)="onSelect($event)">
      <option [value]="0">Tous les groupes de catégories</option>
      @for (option of options; track option) {
        <option [value]="option.id">{{ option.name }}</option>
      }
    </select>
  `,
  styles: [``],
  imports: [
    FormsModule,
    JsonPipe
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Select),
      multi: true
    }
  ]
})
export class Select implements ControlValueAccessor {
  @Input() options: Group[] = [];
  @Output() selectionChange = new EventEmitter<number>();

  selectedValue: number | null = 0;

  onChange = (value: number) => {};
  onTouched = () => {};

  writeValue(value: number): void {
    this.selectedValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onSelect(event: Event) {
    const value = Number((event.target as HTMLSelectElement).value);
    this.selectedValue = value;
    this.onChange(this.selectedValue);
    this.onTouched();
    this.selectionChange.emit(this.selectedValue);
  }
}
