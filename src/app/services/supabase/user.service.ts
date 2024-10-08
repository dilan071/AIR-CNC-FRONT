import { Injectable } from '@angular/core';
import { LoginResponse, RegistroResponse } from '../../features/pages/login-response.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  login(userName: string, password: string): LoginResponse {
    const userData = localStorage.getItem(userName.toLowerCase().trim());

    if (!userData) {
      return {
        success: false,
        message: 'Usuario no encontrado'
      };
    }

    const user = JSON.parse(userData);

    if (user.password !== password) {
      return {
        success: false,
        message: 'Usuario o contraseña incorrectos'
      };
    }

    return {
      success: true
    };
  }

  register(user: { userName: string; password: string; email: string; fullName: string }): RegistroResponse {
    if (localStorage.getItem(user.userName.toLowerCase().trim())) {
      return {
        success: false,
        message: 'Usuario ya existe'
      };
    }

    const userData = JSON.stringify(user);
    localStorage.setItem(user.userName.toLowerCase().trim(), userData);

    return {
      success: true
    };
  }

  getProfile(userName: string) {
    const userData = localStorage.getItem(userName.toLowerCase().trim());
    return userData ? JSON.parse(userData) : null;
  }

  updateProfile(userName: string, updatedData: { fullName: string; email: string; password: string; userName: string }) {
    const userData = this.getProfile(userName);
    if (userData) {
      const updatedUser = {
        ...userData,
        ...updatedData
      };

      // Si se cambia el nombre de usuario, se debe actualizar también el localStorage
      if (userData.userName !== updatedData.userName) {
        localStorage.removeItem(userData.userName.toLowerCase().trim()); // Elimina el antiguo
        localStorage.setItem(updatedData.userName.toLowerCase().trim(), JSON.stringify(updatedUser)); // Guarda el nuevo
      } else {
        localStorage.setItem(userName.toLowerCase().trim(), JSON.stringify(updatedUser)); // Guarda el mismo
      }

      return {
        success: true,
        message: 'Perfil actualizado correctamente'
      };
    } else {
      return {
        success: false,
        message: 'Usuario no encontrado'
      };
    }
  }
}
