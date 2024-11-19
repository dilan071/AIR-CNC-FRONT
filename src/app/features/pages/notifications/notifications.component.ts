import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationService, Notification } from '../../../services/supabase/notification.service';  
import { DatePipe } from '@angular/common';  
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],  
  providers: [DatePipe],  
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];  

  constructor(private notificationService: NotificationService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.notifications = this.notificationService.getNotifications();
  }

  deleteNotification(receiverUserId: number): void {  
    this.notificationService.deleteNotification(receiverUserId.toString());  
    this.notifications = this.notifications.filter(notification => notification.receiver_user_id !== receiverUserId);  // Filtramos usando receiver_user_id
  }
}
