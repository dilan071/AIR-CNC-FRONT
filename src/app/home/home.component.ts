import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { SearchBarComponent } from '../components/search-bar/search-bar.component';
import { GaleryCardComponent } from '../components/galery-card/galery-card.component';
import { FormControl } from '@angular/forms';
import { Supabase } from '../utils/images';

interface Casa {
  id:string;
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
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, SearchBarComponent, GaleryCardComponent, ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
// listas que guardan el material filtrado
  listFilterCountry: Casa[] = [];
  listFilterCity: Casa[] = [];
  listFilterRooms: Casa[] = [];
  listFilterMaxPrice: Casa[] = [];
  listFilterMinPrice: Casa[] = [];
  listFilterMaxDate: Casa[] = [];
  listFilterMinDate: Casa[] = [];

  casas: Casa[] = [
    {
      id:"1",
      title: 'Casa en la Playa',
      rooms: '1',
      image: Supabase("casa1.jpeg"),
      description:
        'Una hermosa casa frente al mar con acceso privado a la playa.',
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
      id:"2",
      title: 'Casa de Campo',
      rooms: '1',
      image: Supabase("casa2.jpeg"),
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
      id:"3",
      title: 'Casa en la Ciudad',
      rooms: '2',
      image: Supabase("casa3.jpeg"),
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
      id:"4",
      title: 'Casa en la Montaña',
      rooms: '2',
      image: Supabase("casa4.jpeg"),
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
      id:"5",
      title: 'Casa Moderna',
      rooms: '6',
      image: Supabase("casa5.jpeg"),
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
    // Agrega más casas aquí
  ];
// carrusel
  images = [
    Supabase("casa3.jpeg"),
    Supabase("casa6.jpeg"),
    Supabase("casa2.jpeg"),
  ];
  
  currentIndex = 0;

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
  // valor de los filtros guardados localmente 
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

  // funcion actualiza el valor de los filtros
  setFilters(event: any) {
    this.rooms = event['rooms'];
    this.searchTerm = event['searchTerm'];
    this.country = event['country'];
    this.city = event['city'];
    this.mindate = event['mindate'];
    this.maxdate = event['maxdate'];
    this.minprice = event['minprice'];
    this.maxprice = event['maxprice'];

    console.log(event['city']);
    console.log(event);
    console.log('');
  }
  // funcion que inicia el filtrado general en el orden
  // locations(ubicacion) => filterRooms(habitaciones) => filterMinPrice(precio minimo) =>filterMaxPrice(precio maximo)  => filterMinDate(fecha minima) => filterMaxDate(fecha maxima)  => 
  filter() {
    // limpio las listas
    this.listFilterCountry= [];
    this.listFilterCity= [];
    this.listFilterRooms= [];
    this.listFilterMaxPrice = [];
    this.listFilterMinPrice = [];
    this.listFilterMaxDate= [];
    this.listFilterMinDate= [];
    //inicio las llamadas
    this.filterCountry(this.casas);
    this.filterCity(this.listFilterCountry);
    this.filterRooms(this.listFilterCity);
      this.filterMinPrice(this.listFilterRooms);
      console.log(this.listFilterRooms,"acabo min price con");
      this.filterMaxPrice(this.listFilterMinPrice);
      console.log(this.listFilterMinPrice,"acabo max price con");
      this.filterMinDate(this.listFilterMaxPrice);
      this.filterMaxDate(this.listFilterMinDate);
      console.log(this.listFilterMaxDate);
      
      return this.listFilterMaxDate;
    }
  // funcion que filtra las casas por una fecha maxima
  filterMaxDate(list: Casa[]) {
    for (let index = 0; index < list.length; index++) {
      this.maxdate !== ''
        ? new Date(list[index].date) <= new Date(this.maxdate)
          ? this.listFilterMaxDate.push(list[index])
          : null
        : this.listFilterMaxDate.push(list[index]);
    }
  }
  // funcion que filtra las casas por una fecha minima
  filterMinDate(list: Casa[]) {
    for (let index = 0; index < list.length; index++) {
      this.mindate !== ''
        ? new Date(list[index].date) >= new Date(this.mindate)
          ? this.listFilterMinDate.push(list[index])
          : null
        : this.listFilterMinDate.push(list[index]);
    }
  }
  // funcion que hace efecto sobre las casas con el filtro de maximo precio y minimo precio
  filterMaxPrice(list: Casa[]) {
    for (let index = 0; index < list.length; index++) {
      console.log(Number(list[index].price));
      console.log(Number(list[index].price) < Number(this.maxprice));
      console.log(Number(this.maxprice));
      
      
      this.maxprice !== ''
        ? Number(list[index].price) < Number(this.maxprice)
          ? this.listFilterMaxPrice.push(list[index])
          : null
        : this.listFilterMaxPrice.push(list[index]);
    }
  }
  // funcion que hace efecto sobre las casas con el filtro de minimo precio y minimo precio
  filterMinPrice(list: Casa[]) {
    for (let index = 0; index < list.length; index++) {
      this.minprice !== ''      
        ? Number(list[index].price) > Number(this.minprice)
          ? this.listFilterMinPrice.push(list[index])
          : null
        : this.listFilterMinPrice.push(list[index]);
    }
  }
  // funcion que hace efecto sobre las casas con el filtro de habitaciones
  filterRooms(list: Casa[]) {
    for (let index = 0; index < list.length; index++) {
      this.rooms !== ''
        ? list[index].rooms == this.rooms
          ? this.listFilterRooms.push(list[index])
          : Number(list[index].rooms)>3 &&this.rooms=="4+"
          ? this.listFilterRooms.push(list[index])
          : null
        : this.listFilterRooms.push(list[index]);
    }
  }
  // funcion que hace efecto sobre las casas con el filtro de  ciudad
  filterCity(list: Casa[]) {
    for (let index = 0; index < list.length; index++) {
      this.city !== ''
      ? list[index].city == this.city
         ?this.listFilterCity.push(list[index])
         : null
      : this.listFilterCity.push(list[index]);
    }
  }
  filterCountry(list: Casa[]) {
    for (let index = 0; index < list.length; index++) {
      this.country !== ''
      ? list[index].country == this.country
         ?this.listFilterCountry.push(list[index])
         : null
      : this.listFilterCountry.push(list[index]);
    }
  }
}
