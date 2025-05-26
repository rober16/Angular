import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FactorialResourceService } from '../../api/resources/factorial-resource.service';

@Component({
  selector: 'app-factorial',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    FactorialResourceService
  ],
  templateUrl: './factorial.component.html',
  styleUrl: './factorial.component.css'
})
export class FactorialComponent implements OnInit, AfterViewInit {

  @ViewChild('iNro') private _nroInput: ElementRef | undefined;
  
  factForm!: FormGroup;
  nros: number[] = [];
  submitted: boolean = false;
  
  constructor(private _service: FactorialResourceService, private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.factForm = this._fb.group({
      nro: new FormControl('', [Validators.required])
    });

    this.form.nro.valueChanges.subscribe(() => {
      this.nros = [];
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this._nroInput?.nativeElement.focus());
  }

  get form(): any { 
    return this.factForm.controls; 
  }

  calcular(): void {
    this.submitted = true;
    if(this.factForm.valid) {
      this._service.getFactorial(this.form.nro.value).subscribe({
        next: (nros:number[]) => {
          this.nros = nros;
          this.submitted = false;
        },
        error: (err: any) => {
          throw err;
        }
      });
    }
  }

}

