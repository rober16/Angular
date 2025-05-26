import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltrarPorPipe } from './pipes/filtrar-por.pipe';
import { AutofocusDirective } from './directivas/autofocus.directive';



@NgModule({
  declarations: [
    FiltrarPorPipe,
    AutofocusDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FiltrarPorPipe,
    AutofocusDirective
  ]
})
export class SharedModule { }
