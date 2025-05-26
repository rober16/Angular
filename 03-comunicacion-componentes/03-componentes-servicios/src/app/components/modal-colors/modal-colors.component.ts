import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ColorsService } from '../../services/colors.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { DataResource } from '../../api/resources/data-resource';
import { IColor } from '../../api/models/i-color';

@Component({
  selector: 'app-modal-colors',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './modal-colors.component.html',
  styleUrl: './modal-colors.component.css'
})
export class ModalColorsComponent implements OnInit {

  colorCtrl!: FormControl;
 
  constructor(private _activeModal: NgbActiveModal, private _service: ColorsService) { }

  ngOnInit(): void {
    this.colorCtrl = new FormControl(this._service.getCurrentColor(), [Validators.required]);
  }

  get colors(): IColor[] {
    return DataResource.colors;
  }

  ok(): void {
    this._service.changeColor(this.colorCtrl.value);
    this._activeModal.close();  
  }

  close(): void {
    this._activeModal.close();
  }


}
