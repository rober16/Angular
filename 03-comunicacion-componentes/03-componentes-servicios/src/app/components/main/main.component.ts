import { Component } from '@angular/core';
import { ModalColorsComponent } from '../modal-colors/modal-colors.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  constructor(private _modal: NgbModal) { }

  open(): void {
    this._modal.open(ModalColorsComponent);    
  }

}
