import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IPersona } from '../../api/models/i-persona';
import { PersonasResourceService } from '../../api/resources/personas-resource.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent implements OnInit {
  
  filtrarCtrl!: FormControl;
  personas!: IPersona[];

  constructor(private _route: ActivatedRoute, private _service: PersonasResourceService) { }

  ngOnInit(): void {
    this.filtrarCtrl = new FormControl('');
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
