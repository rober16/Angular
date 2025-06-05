import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StorageResourceService } from '../../api/resources/storage-resource.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  searchTerm = '';

  constructor(private storageService: StorageResourceService) {
  }

  buscarProducto(): void{
    this.storageService.guardarFiltro(this.searchTerm.trim());
  }
}