import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-select',
  template: `
    <select [ngModel]="selectedValue" (ngModelChange)="onSelect($event)">
      <option [value]="defaultOption.value">{{ defaultOption.label }}</option>
      @for (option of options; track option) {
        <option [value]="option['id']">{{ option[labelKey] }}</option>
      }
    </select>
  `,
  styles: [``],
  imports: [
    FormsModule,
  ],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Select),
      multi: true
    }
  ]
})
export class Select<T extends Record<string, any>> implements ControlValueAccessor, OnInit {
  @Input() public options: T[] = [];
  @Input() public defaultOption?: {value: number, label: string} = {value: null, label: 'Tous'};
  @Input() public labelKey: keyof T = 'label' as keyof T;

  //I decide that for this select, we always want id as valueKey
  @Output() public selectionChange = new EventEmitter<number>();
  public selectedValue: number;

  onChange: (value: number) => void = () => {};
  onTouched: () => void = () => {};

  public ngOnInit(): void {
    this.selectedValue = this.defaultOption?.value ?? null;
  }

  writeValue(value: number): void {
    this.selectedValue = value ?? this.defaultOption.value;
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onSelect(value: number) {
    this.selectedValue = value;
    this.onChange(this.selectedValue);
    this.onTouched();
    this.selectionChange.emit(this.selectedValue);
  }
}
