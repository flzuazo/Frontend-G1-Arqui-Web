import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';


function coinciden(control: AbstractControl): ValidationErrors | null {
  const newPass = control.get('newPassword')?.value;
  const newPass2 = control.get('newPassword2')?.value;
  return newPass && newPass2 && newPass !== newPass2 ? { noCoincide: true } : null;
}

@Component({
  selector: 'app-cambio-contra',
  templateUrl: './cambio-contraseña.html',
  styleUrls: ['./cambio-contraseña.css'],
  imports: [
  ReactiveFormsModule,
  CommonModule
],

})
export class CambioContra {
  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group(
      {
        oldPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)]],
        newPassword2: ['', [Validators.required]]
      },
      { validators: coinciden }
    );
  }

  submit() {
    if (this.form.valid) {
      const { oldPassword, newPassword } = this.form.value;
      const token = localStorage.getItem('token'); // JWT del usuario logueado

      if (!token) {
        alert('No autorizado. Por favor, inicia sesión.');
        return;
      }

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });

      this.http.put<any>(
        'http://localhost:8080/api/change-password',
        { oldPassword, newPassword },
        { headers }
      ).subscribe({
        next: (res) => {
          alert(res.message); // mensaje de éxito
          this.form.reset();
        },
        error: (err) => {
          if (err.status === 400) {
            alert(err.error.message); // contraseña incorrecta o nueva insegura
          } else if (err.status === 403) {
            alert('No autorizado. Vuelve a iniciar sesión.');
          } else {
            alert('Error en el servidor');
          }
        }
      });

    } else {
      this.form.markAllAsTouched();
    }
  }

  volver() {
    history.back();
  }

  // Para mostrar errores en la UI
  get f() {
    return this.form.controls;
  }
}
