import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registrarForm: FormGroup; // Declara registrarForm como FormGroup

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    // Inicializa registrarForm en el constructor
    this.registrarForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      password: ['', [Validators.required, Validators.minLength(1)]], // Cambia la longitud mínima según necesites
      confirmPassword: ['', [Validators.required]], // Campo para confirmar contraseña
      email: ['', [Validators.required, Validators.email]], // Agrega el campo email
    });
  }

  onRegister() {
    // Verifica si el formulario es válido
    if (!this.registrarForm.valid) {
      this.showValidationErrors();
      return;
    }

    const userName = this.registrarForm.value.userName!.trim();
    const password = this.registrarForm.value.password!.trim();
    const confirmPassword = this.registrarForm.value.confirmPassword!.trim();
    const email = this.registrarForm.value.email!.trim();

    // Verifica si las contraseñas coinciden
    if (password !== confirmPassword) {
      Swal.fire({
        title: 'Contraseña Incorrecta',
        text: 'Las contraseñas no coinciden',
        icon: 'error',
      });
      return;
    }

    // Crea un objeto que contenga userName, password y email
    const response = this.userService.register({ userName, password, email });

    if (response.success) {
      Swal.fire({
        title: 'Registro Exitoso',
        text: 'Registro completado exitosamente. Puedes iniciar sesión.',
        icon: 'success',
      }).then(() => {
        this.router.navigateByUrl('/login'); // Redirige al usuario a la página de inicio de sesión
      });
    } else {
      Swal.fire({
        title: 'Registro Fallido',
        text: response.message,
        icon: 'error',
      });
    }
  }

  private showValidationErrors() {
    let message = 'Por favor, complete todos los campos correctamente:\n';

    if (this.registrarForm.get('userName')?.invalid) {
      message += '- Nombre de usuario debe tener entre 8 y 12 caracteres.\n';
    }
    if (this.registrarForm.get('password')?.invalid) {
      message += '- Contraseña es obligatoria y debe tener al menos 1 carácter.\n';
    }
    if (this.registrarForm.get('confirmPassword')?.invalid) {
      message += '- Confirmar contraseña es obligatoria.\n';
    }
    if (this.registrarForm.get('email')?.invalid) {
      message += '- Correo electrónico es obligatorio y debe ser un correo válido.\n';
    }

    Swal.fire({
      title: 'Errores de Validación',
      text: message,
      icon: 'warning',
    });
  }
}
