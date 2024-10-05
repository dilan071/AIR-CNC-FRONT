import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder } from '@angular/forms';import { RouterOutlet } from '@angular/router';
import { Supabase } from '../../utils/images';

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
  selector: 'app-search-bar',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
// listas de acumulacion de paices para evitar filtros con paices o ciudades repetidas
listCountrys = [""];
listCitys = [""];


// variables del reactive form
  rooms = new FormControl('');
  searchTerm = new FormControl('');
  country = new FormControl('');
  city = new FormControl('');
  mindate = new FormControl('');
  maxdate = new FormControl('');
  minprice = new FormControl('');
  maxprice= new FormControl('');

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


// variables que el componente va a devolver a la pagina que lo contendra para saber que filtros estan vigentes
  @Output() setCriterios: EventEmitter<any> = new EventEmitter<string>();
  @Output() setMinprice: EventEmitter<string> = new EventEmitter<string>();
  @Output() setMaxdate: EventEmitter<string> = new EventEmitter<string>();
  @Output() setMindate: EventEmitter<string> = new EventEmitter<string>();
  @Output() setCity: EventEmitter<string> = new EventEmitter<string>();
  @Output() setCountry: EventEmitter<string> = new EventEmitter<string>();
  @Output() setRooms: EventEmitter<string> = new EventEmitter<string>();

  // funcion para enviar los filtros selecionados 
  
  enviarValor() {
        this.setCriterios.emit(
      {
        "maxprice":this.maxprice.value!,  
        "searchTerm":this.searchTerm.value!,  
        "minprice":this.minprice.value!,
        "maxdate":this.maxdate.value!,
        "mindate":this.mindate.value!,
        "city":this.city.value!,
        "country":this.country.value!,
        "rooms":this.rooms.value!
      }
      
      );
  }

// funcion para resetear todos los filtros a 0
  setReset(){
    this.rooms = new FormControl("");
    this.searchTerm = new FormControl('');
    this.country = new FormControl('');
    this.city = new FormControl('');
    this.mindate = new FormControl('');
    this.maxdate = new FormControl('');
    this.minprice = new FormControl('');
    this.maxprice= new FormControl('');  
    this.setCriterios.emit(
      {
        "maxprice":this.maxprice.value!,  
        "searchTerm":this.searchTerm.value!,  
        "minprice":this.minprice.value!,
        "maxdate":this.maxdate.value!,
        "mindate":this.mindate.value!,
        "city":this.city.value!,
        "country":this.country.value!,
        "rooms":this.rooms.value!

      }
    );
  
  }
  
}
