import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormDataComponent } from "./components/form-data/form-data.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    FormDataComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = '02-form-datos-personales';
}
