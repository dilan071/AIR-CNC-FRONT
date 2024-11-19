import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService, Message } from '../../../services/supabase/message.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  messageForm: FormGroup;
  messages: Message[] = []; 
  contacts = [
    { id: 1, name: 'Juan Pérez', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', lastMessage: new Date() },
    { id: 2, name: 'María González', avatar: 'https://randomuser.me/api/portraits/women/1.jpg', lastMessage: new Date() },
    { id: 3, name: 'Carlos López', avatar: 'https://randomuser.me/api/portraits/men/2.jpg', lastMessage: new Date() },
    // Añadir más contactos aquí
  ];
  selectedContact: any = null;
  senderUser: number = 123; 

  constructor(private fb: FormBuilder, private messageService: MessageService, private route: ActivatedRoute) {
    this.messageForm = this.fb.group({
      message: ['', Validators.required] 
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const userId = params['id'];
      if (userId) {
        this.senderUser = parseInt(userId, 10); 
      }
    });
  }

  // Seleccionar un contacto para el chat
  selectContact(contact: any): void {
    this.selectedContact = contact;
    this.loadMessages(contact.id);
  }

  // Cargar los mensajes del historial de acuerdo al contacto seleccionado
  loadMessages(receiver_user_id: number): void {
    const sender_user_id = this.senderUser; 

    this.messageService.getMessageHistory(sender_user_id, receiver_user_id).subscribe(
      (messages) => {
        this.messages = messages;
        console.log('Historial de mensajes:', messages);
      },
      (error) => {
        console.error('Error al cargar historial de mensajes:', error);
      }
    );
  }

  // Enviar mensaje al backend
  onSubmit(): void {
    if (this.messageForm.valid && this.selectedContact) {
      const messageData: Message = {
        ...this.messageForm.value,
        sender_user_id: this.senderUser, 
        receiver_user_id: this.selectedContact.id,
        createdAt: new Date()
      };

      this.messageService.sendMessage(messageData).subscribe(
        (response) => {
          console.log('Mensaje enviado:', response);
          this.messageForm.reset();
          this.loadMessages(this.selectedContact.id); 
        },
        (error) => {
          console.error('Error al enviar mensaje:', error);
        }
      );
    }
  }
}
