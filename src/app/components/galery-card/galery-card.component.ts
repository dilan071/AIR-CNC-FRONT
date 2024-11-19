import { Component, Input, OnInit } from '@angular/core';
import { ReviewService, Review } from '../../services/supabase/review.service';
import { ReviewFormComponent } from '../../features/pages/reviews/review-form.component'; 
import { CommonModule } from '@angular/common';

interface Casa {
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
}

@Component({
  selector: 'app-galery-card',
  standalone: true,
  imports: [CommonModule, ReviewFormComponent],
  templateUrl: './galery-card.component.html',
  styleUrls: ['./galery-card.component.css'],
})
export class GaleryCardComponent implements OnInit {
  @Input() cardCasainfo!: Casa;

  reviews: Review[] = []; // Lista de reseñas para la propiedad

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  // Cargar las reseñas de la propiedad
  private loadReviews(): void {
    this.reviewService.getReviewsByProperty(this.cardCasainfo.id).subscribe(
      (response) => {
        this.reviews = response;
      },
      (error) => {
        console.error('Error al cargar reseñas:', error);
      }
    );
  }

  // Actualizar las reseñas tras agregar una nueva
  onReviewSubmitted(): void {
    this.loadReviews();
  }
}
