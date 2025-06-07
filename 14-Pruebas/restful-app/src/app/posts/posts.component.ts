import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  errorMessage = '';

  constructor(private dataService: DataService) {}
  
  ngOnInit(): void {
    this.dataService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }

}
