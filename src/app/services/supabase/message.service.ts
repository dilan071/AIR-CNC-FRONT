import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Message {
  sender_user_id: number;
  receiver_user_id: number;
  listing_id?: number; 
  message: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private apiUrl = 'http://localhost:3000/api/messages';

  constructor(private http: HttpClient) {}

  /**
   * Enviar un mensaje.
   * @param message Datos del mensaje.
   * @returns Observable con la respuesta del servidor.
   */
  sendMessage(message: Message): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.apiUrl}/enviar-mensajes`, message, {headers: {'Authorization': `Bearer ${token}`}});
  }

  /**
   * Obtener el historial de mensajes entre dos usuarios.
   * @param senderId ID del usuario emisor.
   * @param receiverId ID del usuario receptor.
   * @returns Observable con la lista de mensajes.
   */
  getMessageHistory(senderId: number, receiverId: number): Observable<Message[]> {
    const token = localStorage.getItem('token');
    const params = new HttpParams()
      .set('sender_user_id', senderId.toString())
      .set('receiver_user_id', receiverId.toString());
      

    return this.http.post<Message[]>(`${this.apiUrl}/historial-de-mensajes`, { params }, {headers: {'Authorization': `Bearer ${token}`}});
  }

  /**
   * Obtener mensajes recibidos por un usuario específico.
   * @param receiverId ID del usuario receptor.
   * @returns Observable con la lista de mensajes.
   */
  getMessagesByUser(receiverId: number): Observable<Message[]> {
    const token = localStorage.getItem('token');
    const params = new HttpParams().set('receiver_user_id', receiverId.toString());
    return this.http.post<Message[]>(`${this.apiUrl}/recibir-mensajes`, { params }, {headers: {'Authorization': `Bearer ${token}`}});
  }

  /**
   * Obtener el número de mensajes no leídos de un usuario.
   * @param receiverId ID del usuario receptor.
   * @returns Observable con el número de mensajes no leídos.
   */
  getUnreadMessages(receiverId: number): Observable<number> {
    const token = localStorage.getItem('token');
    const params = new HttpParams().set('receiver_user_id', receiverId.toString());
    return this.http.post<number>(`${this.apiUrl}/notificaciones-mensajes-recibidos`, { params }, {headers: {'Authorization': `Bearer ${token}`}});
  }
}
