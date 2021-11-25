import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StationRoutingModule } from './station-routing.module';
import { StationComponent } from './station.component';


@NgModule({
  declarations: [
    StationComponent
  ],
  imports: [
    CommonModule,
    StationRoutingModule
  ]
})
export class StationModule { }
