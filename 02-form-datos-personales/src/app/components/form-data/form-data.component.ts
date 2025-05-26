import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { DataResource } from '../../api/resources/data-resource';
import { IHobby } from '../../api/models/i-hobby';
import { IGenero } from '../../api/models/i-genero';
import { INacionalidad } from '../../api/models/i-nacionalidad';
import { IEquipo } from '../../api/models/i-equipo';

@Component({
  selector: 'app-form-data',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-data.component.html',
  styleUrl: './form-data.component.css'
})
export class FormDataComponent implements OnInit {

  form!: FormGroup;
  showInfo: boolean = false;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  get generos(): IGenero[] {
    return DataResource.generos;
  }

  get nacionalidades(): INacionalidad[] {
    return DataResource.nacionalidades;
  }

  get equipos(): IEquipo[] {
    return DataResource.equipos;
  }

  get hobbies(): IHobby[] {
    return DataResource.hobbies;
  }

  get hobbiesArray(): FormArray {
    return this.form.controls['hobbies'] as FormArray;
  }

  setHobby(event: any): void {
    if(event.target.checked) {
      this.hobbiesArray.push(new FormControl(event.target.value));
    }
    else {
      let index = this.hobbiesArray.controls.findIndex(h => h.value == event.target.value);
      if(index >= 0) {
        this.hobbiesArray.removeAt(index);
      }
    }
  }

  showData(): void {
    if(this.form.valid) {
      console.log(this.form.value);
      this.showInfo = true;
    }
  }

  reset(): void {
    this.initForm();
  }

  back(): void {
    this.showInfo = false;
    this.reset();
  }
 
  private initForm(): void {
    this.form = this._fb.group({
      apellido: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      nombre: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.maxLength(32)]],
      confirmar_clave: ['', [Validators.required, Validators.maxLength(32)]],
      genero: [DataResource.generos.find(g => g.checked)?.codigo],
      fecha_nacimiento: [''],
      nacionalidad: [DataResource.nacionalidades.find(n => n.selected)?.codigo],
      equipo: ['', [this.countEquipos()]],
      hobbies: this._fb.array([]),
      actividades: ['']
    });

    this.form.addValidators(this.matchClaves());
		this.form.updateValueAndValidity();
  }

  private matchClaves(): ValidatorFn  {
    return (group: AbstractControl): ValidationErrors | null => {
			const claveCtrl = group.get("clave");
			const confirmarClaveCtrl = group.get("confirmar_clave");

			if (!claveCtrl || !confirmarClaveCtrl) {
				return null;
			}
			else if (confirmarClaveCtrl.errors && !confirmarClaveCtrl.hasError("clavesMismatch")) {
				return null;
			}
			else if (claveCtrl.value !== confirmarClaveCtrl.value) {
				confirmarClaveCtrl?.setErrors({ clavesMismatch: true });
				return { clavesMismatch: true };
			} 
			confirmarClaveCtrl?.setErrors(null);
			return null;
		}
	}

  private countEquipos(): ValidatorFn  {
    return (eqCtrl: AbstractControl): ValidationErrors | null => {
      return eqCtrl.value.length > 2 ? { eqMismatch: true } : null;
    }
	}

}
