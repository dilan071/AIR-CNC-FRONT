import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 

export interface Notification {
  receiver_user_id: number;
  sender_user_id: number;
  message?: string;  
  timestamp?: Date;  
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl = 'http://localhost:3000/api/messages'; 

  constructor(private http: HttpClient) {}

  // Método para obtener todas las notificaciones del backend
  fetchNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.baseUrl}/notificaciones-mensajes-recibidos`).pipe(
      map((data: any[]) => {
        return data.map(notification => ({
          receiver_user_id: notification.receiver_user_id,
          sender_user_id: notification.sender_user_id,
          message: `Mensaje de usuario ${notification.sender_user_id}`,  
          timestamp: new Date()  
        }));
      })
    );
  }

  // Método para agregar una nueva notificación
  addNotification(notificationData: Notification): void {
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    notifications.push(notificationData);
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }

  // Método para obtener todas las notificaciones del localStorage
  getNotifications(): Notification[] {
    return JSON.parse(localStorage.getItem('notifications') || '[]');
  }

  // Método para eliminar una notificación por su ID
  deleteNotification(receiverUserId: string): void {  
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const updatedNotifications = notifications.filter((notification: Notification) => notification.receiver_user_id.toString() !== receiverUserId);  // Convierte receiver_user_id a string
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  }

  // Método para eliminar todas las notificaciones
  clearNotifications(): void {
    localStorage.removeItem('notifications');
  }
}
