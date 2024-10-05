import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterLink, PerfilComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.less'
})
export class PerfilComponent {

}
