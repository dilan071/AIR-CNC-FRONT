import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { SearchBarComponent } from '../components/search-bar/search-bar.component';
import { GaleryCardComponent } from '../components/galery-card/galery-card.component';
import { Supabase } from '../utils/images';
import { PerfilComponent } from '../features/pages/perfil/perfil.component';
import { UserService } from '../auth/services/user.service';


export interface Casa {
  id: string;
  rooms: string;
  title: string;
  description: string;
  price: string;
  country: string;
  city: string;
  owner: string;
  area: string;
  negotiable: string;
  type: string;
  image: string;
  mapSrc: string;
  date: string;
  searchTerm?: string;
  reseñas?: string[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    RouterLink, 
    SearchBarComponent, 
    GaleryCardComponent,
    PerfilComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user = {
    profilePicture: '',
    fullName: '',
    email: ''
  };
  defaultProfileImage = '/assets/no-avatar.jpg';
 
  constructor(private userService: UserService) {}



  // Listas que guardan el material filtrado
  casas: Casa[] = [
    {
      id: '1',
      title: 'Casa en la Playa',
      rooms: '1',
      image: Supabase('casa1.jpeg'),
      description: 'Una hermosa casa frente al mar con acceso privado a la playa.',
      price: '200000',
      country: 'colombia',
      city: 'bogoto',
      owner: 'Juan Pérez',
      date: '2022-10-03',
      area: 'Zona residencial segura',
      negotiable: 'Sí',
      type: 'Venta',
      mapSrc: 'https://www.google.com/maps/embed?pb=...Casa1Ubicacion',
    },
    {
      id: '2',
      title: 'Casa de Campo',
      rooms: '1',
      image: Supabase('casa2.jpeg'),
      country: 'colombia',
      city: 'bogoto',
      description: 'Una acogedora casa de campo con vistas espectaculares.',
      price: '$150,000',
      owner: 'Maria López',
      date: '2022-10-09',
      area: 'Zona rural tranquila',
      negotiable: 'No',
      type: 'Renta',
      mapSrc: 'https://www.google.com/maps/embed?pb=...Casa2Ubicacion',
    },
    {
      id: '3',
      title: 'Casa en la Ciudad',
      rooms: '2',
      image: Supabase('casa3.jpeg'),
      description: 'Una moderna casa en el corazón de la ciudad.',
      price: '$300,000',
      country: 'UUEE',
      city: 'florida',
      date: '2024-10-03',
      owner: 'María López',
      area: 'Centro de la ciudad',
      negotiable: 'Sí',
      type: 'Venta/Renta',
      mapSrc: 'https://www.google.com/maps/embed?pb=...Casa3Ubicacion',
    },
    {
      id: '4',
      title: 'Casa en la Montaña',
      rooms: '2',
      image: Supabase('casa4.jpeg'),
      description: 'Casa acogedora rodeada de naturaleza.',
      price: '150000',
      country: 'UUEE',
      city: 'florida',
      date: '2024-10-03',
      owner: 'María López',
      area: 'Zona tranquila',
      negotiable: 'No',
      type: 'Venta',
      mapSrc: 'https://www.google.com/maps/embed?pb=...Casa2Ubicacion',
    },
    {
      id: '5',
      title: 'Casa Moderna',
      rooms: '6',
      image: Supabase('casa5.jpeg'),
      description: 'Casa con diseño contemporáneo y todas las comodidades.',
      price: '300000',
      date: '2024-10-08',
      country: 'colombia',
      city: 'popayan',
      owner: 'Carlos Gómez',
      area: 'Zona de lujo',
      negotiable: 'Sí',
      type: 'Venta',
      mapSrc: 'https://www.google.com/maps/embed?pb=...Casa3Ubicacion',
    },
  ];

  // Carrusel
  images = [
    Supabase('casa3.jpeg'),
    Supabase('casa6.jpeg'),
    Supabase('casa5.jpeg'),
  ];

  currentIndex = 0;

  ngOnInit(): void {
    // Cargar los datos del usuario desde el localStorage
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser) {
      this.user.profilePicture = storedUser.profilePicture || this.defaultProfileImage;
      this.user.fullName = storedUser.fullName || 'Nombre no disponible';
      this.user.email = storedUser.email || 'Email no disponible';
    }
  }

  updateUserProfile() {
    // Aquí puedes definir el comportamiento para actualizar la imagen y el email
    const updatedUser = {
      profilePicture: this.user.profilePicture,
      fullName: this.user.fullName,
      email: this.user.email
    };

    // Guardamos la nueva imagen y el correo en el localStorage
    localStorage.setItem('user', JSON.stringify(updatedUser));
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  // Valor de los filtros guardados localmente
  criterios = [''];
  title = 'Air-cn';
  rooms = '';
  searchTerm = '';
  country = '';
  city = '';
  mindate = '';
  maxdate = '';
  minprice = '';
  maxprice = '';

  // Función para trackBy en el *ngFor para identificar elementos únicos por su título
  trackByTitle(index: number, item: Casa) {
    return item.title;
  }

  // Funcion que actualiza el valor de los filtros
  setFilters(event: any) {
    this.rooms = event['rooms'];
    this.searchTerm = event['searchTerm'];
    this.country = event['country'];
    this.city = event['city'];
    this.mindate = event['mindate'];
    this.maxdate = event['maxdate'];
    this.minprice = event['minprice'];
    this.maxprice = event['maxprice'];
  }

  // Funcion que inicia el filtrado general en el orden
  filter() {
    let filteredCasas = [...this.casas]; // Crea una copia de la lista original para no modificarla

    // Aplica todos los filtros
    if (this.country) {
      filteredCasas = filteredCasas.filter(casa => casa.country.toLowerCase().includes(this.country.toLowerCase()));
    }

    if (this.city) {
      filteredCasas = filteredCasas.filter(casa => casa.city.toLowerCase().includes(this.city.toLowerCase()));
    }

    if (this.searchTerm) {
      filteredCasas = filteredCasas.filter(casa => casa.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }

    // Filtrado por fecha
    if (this.mindate) {
      filteredCasas = filteredCasas.filter(casa => new Date(casa.date) >= new Date(this.mindate));
    }
    if (this.maxdate) {
      filteredCasas = filteredCasas.filter(casa => new Date(casa.date) <= new Date(this.maxdate));
    }

    // Filtrado por precio
    if (this.minprice) {
      filteredCasas = filteredCasas.filter(casa => parseInt(casa.price) >= parseInt(this.minprice));
    }
    if (this.maxprice) {
      filteredCasas = filteredCasas.filter(casa => parseInt(casa.price) <= parseInt(this.maxprice));
    }

    return filteredCasas;
  }
} 