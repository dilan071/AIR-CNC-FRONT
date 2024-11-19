import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReviewService } from '../../../services/supabase/review.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Input } from '@angular/core';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit {
  @Input() listingId!: string; // Recibe el ID de la propiedad
  reviewForm: FormGroup;

  constructor(private fb: FormBuilder, private reviewService: ReviewService) {
    this.reviewForm = this.fb.group({
      listingId: ['', Validators.required],  
      rating: [null, Validators.required],
      comment: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.listingId) {
      this.reviewForm.patchValue({ listingId: this.listingId });
    }
  }

  onSubmit(): void {
    if (this.reviewForm.valid) {
      const reviewData = {
        userId: parseInt(localStorage.getItem('currentUserId') || '', 10),  
        listingId: this.reviewForm.value.listingId,  
        rating: this.reviewForm.value.rating,
        comment: this.reviewForm.value.comment,
        createdAt: new Date(),  
      };

      this.reviewService.addReview(reviewData).subscribe(
        response => {
          console.log('Reseña agregada exitosamente', response);
          this.reviewForm.reset();
        },
        error => {
          console.error('Error al agregar reseña', error);
        }
      );
    }
  }
}
