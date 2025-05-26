import { Component } from '@angular/core';
import { ModalDataComponent } from '../modal-data/modal-data.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IData } from '../../api/models/i-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  data: IData | undefined;

  constructor(private _modal: NgbModal) {}

  open(): void {
    this.data = undefined;
    const modalRef = this._modal.open(ModalDataComponent);
          modalRef.result.then((result: IData) => {
            if(result) {
              this.data = result;
            }
          });
  }

}
