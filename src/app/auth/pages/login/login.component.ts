import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';  
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],  
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: any;  // Declaración de loginForm como 'any'

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    // Inicialización del formulario en el constructor
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      password: ['', [Validators.required]]
    });
  }

  onLogin() {
    // Verifica si el formulario es válido
    if (!this.loginForm.valid) {
      Swal.fire({
        title: 'Ingreso',
        text: 'Debe diligenciar todos los campos',
        icon: 'error',
      });
      return;
    }

    const userName = this.loginForm.value.userName!.trim();
    const password = this.loginForm.value.password!.trim();

    const response = this.userService.login(userName, password);

    if (response.success) {
      Swal.fire({
        title: 'Ingreso Exitoso',
        text: 'Inicio de sesión exitoso.',
        icon: 'success',
      });
      this.router.navigateByUrl('/home');
    } else {
      Swal.fire({
        title: 'Ingreso Fallido',
        text: response.message,
        icon: 'error',
      });
    }
  }
}
