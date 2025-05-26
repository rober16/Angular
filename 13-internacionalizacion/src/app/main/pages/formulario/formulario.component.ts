import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IActividad } from '../../api/models/i-actividad';
import { IEquipo } from '../../api/models/i-equipo';
import { IGenero } from '../../api/models/i-genero';
import { INacionalidad } from '../../api/models/i-nacionalidad';
import { PersonasResourceService } from '../../api/resources/personas-resource.service';
import { IPersonaInfo } from '../../api/models/i-persona-info';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit {

  @ViewChild('iForm') iForm!: NgForm;

  form!: FormGroup;

  generos!: IGenero[];
  nacionalidades!: INacionalidad[];
  equipos!: IEquipo[];
  actividades!: IActividad[];

  constructor(private _fb: FormBuilder, private _route: ActivatedRoute, private _service: PersonasResourceService, private _router: Router) { }

  ngOnInit(): void {
    this._route.data.subscribe((data) => {
      this.generos        = data["generos"];
      this.nacionalidades = data["nacionalidades"];
      this.equipos        = data["equipos"];
      this.actividades    = data["actividades"];

      this.initForm();

      if(data["info"]) {
        this.setForm(data["info"]);
      }
    });    
  }
 
  get actividadesArray(): FormArray {
    return this.form.controls['actividades'] as FormArray;
  }

  setActividades(event: any): void {
    this.actividadesArray.markAsDirty();
    if(event.target.checked) {
      this.actividadesArray.push(new FormControl(event.target.value));
    }
    else {
      let index = this.actividadesArray.controls.findIndex(a => a.value == event.target.value);
      if(index >= 0) {
        this.actividadesArray.removeAt(index);
      }
    }
  }

  guardar(): void {
    if(this.form.valid) {
      let info = this.form.value;

      if(info.equipos == "") {
        delete info.equipos;
      }
      if(info.fechaNacimiento == "") {
        delete info.fechaNacimiento;
      }

      this._service.actPersona(info).subscribe(() => {
        this._router.navigate(['/main']);
      });
    }
  }

  private initForm(): void {
    this.form = this._fb.group({
      nroPersona: [''],
      apellido: ['', [Validators.required, Validators.maxLength(100)]],
      nombre: ['', [Validators.required, Validators.maxLength(255)]],
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.maxLength(32)]],
      confirmarClave: ['', [Validators.required, Validators.maxLength(32)]],
      codGenero: [this.generos.find(g => g.selected)?.codigo],
      fechaNacimiento: [''],
      codNacionalidad: [this.nacionalidades.find(n => n.selected)?.codigo],
      equipos: ['', [this.countEquipos()]],
      actividades: this._fb.array([]),
      otrasActividades: ['']
    });

    this.form.addValidators(this.matchClaves());
		this.form.updateValueAndValidity();
  }

  private setForm(info: IPersonaInfo): void {
    if(info.fechaNacimiento) {
      const fechaNacimiento = new Date(info.fechaNacimiento).toISOString().split('T')[0];
      this.form.get("fechaNacimiento")?.setValue(fechaNacimiento);
    }

    this.form.get("nroPersona")?.setValue(info.nroPersona);
    this.form.get("apellido")?.setValue(info.apellido);
    this.form.get("nombre")?.setValue(info.nombre);
    this.form.get("correo")?.setValue(info.correo);
    this.form.get("clave")?.setValue(info.clave);
    this.form.get("codGenero")?.setValue(info.codGenero);
    
    this.form.get("codNacionalidad")?.setValue(info.codNacionalidad);
    this.form.get("equipos")?.setValue(info.equipos || '');
    this.form.get("otrasActividades")?.setValue(info.otrasActividades);

    info.actividades?.forEach(a => {
      let actividad = this.actividades.find(ac => ac.id == a);
      if(actividad) {
        actividad.checked = true;
        this.actividadesArray.push(new FormControl(a))
      }      
    });
  }

  private matchClaves(): ValidatorFn  {
    return (group: AbstractControl): ValidationErrors | null => {
			const claveCtrl = group.get("clave");
			const confirmarClaveCtrl = group.get("confirmarClave");

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

