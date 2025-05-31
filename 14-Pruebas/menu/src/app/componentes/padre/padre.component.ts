import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HijoComponent } from '../hijo/hijo.component';


@Component({
  selector: 'app-padre',
  standalone: true,
  imports: [CommonModule, FormsModule, HijoComponent],
  templateUrl: './padre.component.html',
  styleUrl: './padre.component.css'
})
export class PadreComponent {
  nombre: string = 'Roberto';
}
