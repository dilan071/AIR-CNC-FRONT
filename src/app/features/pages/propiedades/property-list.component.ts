import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent {
  propiedades = [
    { id: '1', title: 'Casa en la Playa' },
    { id: '2', title: 'Casa de Campo' },
    { id: '3', title: 'Casa en la Ciudad' }
  ];

  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/home']);
  }

  editProperty(id: string) {
    this.router.navigate([`/edit-property/${id}`]);
  }

  deleteProperty(id: string) {
   
    console.log('Eliminando propiedad', id);
  }
}
