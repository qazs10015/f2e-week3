import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavariteRoutingModule } from './favarite-routing.module';
import { FavariteComponent } from './favarite.component';


@NgModule({
  declarations: [
    FavariteComponent
  ],
  imports: [
    CommonModule,
    FavariteRoutingModule
  ]
})
export class FavariteModule { }
