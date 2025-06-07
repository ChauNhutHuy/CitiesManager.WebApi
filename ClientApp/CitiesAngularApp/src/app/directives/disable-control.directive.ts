import { Directive, Input } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[disableControl]'
})
export class DisableControlDirective {
  constructor(private ngControl: NgControl) { }

  @Input() set disableControl(condition: boolean) {
    var control = this.ngControl.control as FormControl;

    if (control) {
      if (condition)
        control.disable();
      else
        control.enable();
    }
  }

}
export function CompareValidation(controlName: string, matchingControlName: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);

    if (!control || !matchingControl) {
      return null;
    }

    if (matchingControl.errors && !matchingControl.errors['compareValidation']) {
      return null;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ compareValidation: true });
      return { compareValidation: true };
    } else {
      matchingControl.setErrors(null);
      return null;
    }
  };
}