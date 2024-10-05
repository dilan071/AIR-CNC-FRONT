import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroComponent } from './registro.component'; // Asegúrate de que la ruta sea correcta

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroComponent] // Cambiar 'imports' a 'declarations'
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
