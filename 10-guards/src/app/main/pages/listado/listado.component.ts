import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IPersona } from '../../api/models/i-persona';
import { PersonasResourceService } from '../../api/resources/personas-resource.service';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent implements OnInit {
  
  personas!: IPersona[];

  constructor(private _route: ActivatedRoute, private _service: PersonasResourceService) { }

  ngOnInit(): void {
    this._route.data.subscribe((data) => {
      this.personas = data["listado"];
    });
  }

  eliminar(id: string): void {
    this._service.delPersona(id).subscribe(() => {
      this.personas = this.personas.filter(p => p.idPersona !== id);
    });
  }

}
