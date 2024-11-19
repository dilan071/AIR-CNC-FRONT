import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Property {
  id: string;  
  title: string;
  description: string;
  ownerUserName: string;
  pricePerNight: number;
  location: string;
  images?: string[];  
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private apiUrl = 'http://localhost:3000/api/listings'; 

  constructor(private http: HttpClient) {}

  // Obtener todas las propiedades de un propietario específico
  getPropertiesByOwner(ownerUserName: string): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.apiUrl}/obtener-propiedaded-owner?ownerUserName=${ownerUserName}`);
  }

  // Agregar una nueva propiedad
  addProperty(property: Property): Observable<Property> {
    return this.http.post<Property>(`${this.apiUrl}/agregar-propiedad`, property);
  }

  // Editar una propiedad existente
  editProperty(propertyId: string, updatedData: Partial<Property>): Observable<Property> {
    return this.http.put<Property>(`${this.apiUrl}/editar-propiedad/${propertyId}`, updatedData);
  }

  // Eliminar una propiedad
  deleteProperty(propertyId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar-propiedad/${propertyId}`);
  }

  // Obtener una propiedad por su ID
  getPropertyById(propertyId: string): Observable<Property> {
    return this.http.get<Property>(`${this.apiUrl}/obtener-propiedad-buyer/${propertyId}`);
  }

  // Filtrar propiedades
  getFilteredProperties(filters: any): Observable<Property[]> {
    return this.http.post<Property[]>(`${this.apiUrl}/obtener-propiedaded-filtradas`, filters);
  }
}
