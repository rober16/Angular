import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent {
  tipo!: string;
  constructor(private route: ActivatedRoute) {}
  
  ngOnInit() {
    this.tipo = this.route.snapshot.paramMap.get('id')!;
  }
}
