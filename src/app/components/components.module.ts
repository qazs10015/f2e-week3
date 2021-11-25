import { RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';



@NgModule({
  declarations: [NavComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavComponent
  ]
})
export class ComponentsModule { }
