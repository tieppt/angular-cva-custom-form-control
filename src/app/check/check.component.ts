import { Component, OnInit, Input, Output, EventEmitter, Provider, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const provider: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckComponent),
  multi: true
};

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss'],
  providers: [provider]
})
export class CheckComponent implements OnInit, ControlValueAccessor {

  private _checked = false;
  @Input()
  get checked() {
    return this._checked;
  }
  set checked(v: any) {
    if (v === false || v === 'false') {
      this._checked = false;
    } else {
      this._checked = true;
    }
    this.updateBinding();
  }

  private _readonly = false;
  @Input()
  get readonly() {
    return this._readonly;
  }
  set readonly(v: any) {
    if (v === false || v === 'false') {
      this._readonly = false;
    } else {
      this._readonly = true;
    }
    this.updateBinding();
  }
  public bindingClasses = {
    'checkbox-checked': this._checked,
    'checkbox-uncheck': !this._checked,
    'disabled': this._readonly
  };

  @Output()
  checkedChange = new EventEmitter<boolean>();

  onChange = (v: boolean) => {};
  onTouched = () => {};

  constructor() { }

  ngOnInit() {
  }

  private updateBinding() {
    this.bindingClasses = {
      'checkbox-checked': this._checked,
      'checkbox-uncheck': !this._checked,
      'disabled': this._readonly
    };
  }

  toggleChecked() {
    if (this._readonly) {
      return;
    }
    this._checked = !this._checked;
    this.checkedChange.emit(this._checked);
    this.updateBinding();
    this.onChange(this._checked);
    this.onTouched();
  }

  writeValue(value: any) {
    this.checked = value;
  }
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.readonly = isDisabled;
  }

}
