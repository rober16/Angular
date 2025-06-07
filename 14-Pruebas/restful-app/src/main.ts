import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { PostsComponent } from './app/posts/posts.component';
import { DataService } from './app/data.service';

bootstrapApplication(PostsComponent, {
  providers: [
    provideHttpClient(),
    DataService // Proporciona explícitamente el servicio
  ]
}).catch(err => console.error(err));