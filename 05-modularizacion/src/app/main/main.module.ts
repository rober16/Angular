import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { CompTradicionalComponent } from './pages/comp-tradicional/comp-tradicional.component';


@NgModule({
  declarations: [
    CompTradicionalComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
