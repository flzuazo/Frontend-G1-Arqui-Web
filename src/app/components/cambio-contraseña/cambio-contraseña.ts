import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';

function coinciden(control: AbstractControl): ValidationErrors | null {
  const p1 = control.get('password')?.value;
  const p2 = control.get('password2')?.value;
  return p1 && p2 && p1 !== p2 ? { noCoincide: true } : null;
}

@Component({
  selector: 'app-cambio-contraseña',
  templateUrl: './cambio-contraseña.html',
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./cambio-contraseña.css']
})
export class CambioContra{
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)]],
        password2: ['', [Validators.required]]
      },
      { validators: coinciden }
    );
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value.password);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
