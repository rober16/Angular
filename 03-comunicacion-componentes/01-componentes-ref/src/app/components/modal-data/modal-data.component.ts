import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-data',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './modal-data.component.html',
  styleUrl: './modal-data.component.css'
})
export class ModalDataComponent implements OnInit, AfterViewInit {

  @ViewChild('iFN') private _textInput!: ElementRef;
  info!: FormGroup;  

  constructor(private _fb: FormBuilder, private _activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.info = this._fb.group({
      lastName: ['', [Validators.required, Validators.maxLength(40)]],
      firstName: ['', [Validators.required, Validators.maxLength(255)]]
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this._textInput?.nativeElement.focus());
  }

  get firstName(): AbstractControl {
    return this.info.controls['firstName'];
  }

  get lastName(): AbstractControl {
    return this.info.controls['lastName'];
  }

  ok(): void {
    if(this.info.valid) {
      this._activeModal.close(this.info.value);
    }
  }

  close(): void {
    this._activeModal.close();
  }

}
