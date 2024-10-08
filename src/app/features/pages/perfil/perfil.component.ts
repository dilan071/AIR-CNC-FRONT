import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/supabase/user.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.less']
})
export class PerfilComponent implements OnInit {
  profile: any = { fullName: '', email: '', userName: '', password: '' };

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    const userName = localStorage.getItem('currentUser');
    if (userName) {
      const userProfile = this.userService.getProfile(userName);
      if (userProfile) {
        this.profile = userProfile;
      } else {
        this.router.navigate(['/login']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  updateProfile() {
    const { fullName, email, password, userName } = this.profile; // Asegúrate de incluir userName

    if (!fullName || !email || !password || !userName) { // Validación de todos los campos
      Swal.fire({
        title: 'Error',
        text: 'Debe completar todos los campos',
        icon: 'error'
      });
      return;
    }

    // Actualiza el perfil y pasa el nuevo userName
    const response = this.userService.updateProfile(userName, { fullName, email, password, userName });

    if (response.success) {
      // Actualiza 'currentUser' en localStorage si se cambió el nombre de usuario
      localStorage.setItem(userName.toLowerCase().trim(), JSON.stringify(this.profile));
      localStorage.setItem('currentUser', userName.toLowerCase().trim()); // Asegúrate de usar el nuevo nombre de usuario

      Swal.fire({
        title: 'Éxito',
        text: 'Perfil actualizado correctamente',
        icon: 'success'
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: response.message,
        icon: 'error'
      });
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
