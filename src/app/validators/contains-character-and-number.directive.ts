import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

export function containsCharacterAndNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const containsCharacterAndNumberRegexp = /^(?=.*[A-Za-z])(?=.*\d).+$/gm;
    const isValid = containsCharacterAndNumberRegexp.test(control.value);
    return isValid
      ? null
      : { containsCharacterAndNumber: { value: control.value } };
  };
}

@Directive({
  selector: '[appContainsCharacterAndNumber]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ContainsCharacterAndNumberDirective,
      multi: true,
    },
  ],
})

export class ContainsCharacterAndNumberDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    // hte returned function from containsCharacterAndNumberValidator() is immediately invoked with the argument control
    return containsCharacterAndNumberValidator()(control);
  }
}
