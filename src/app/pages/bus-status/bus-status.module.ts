import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusStatusRoutingModule } from './bus-status-routing.module';
import { BusStatusComponent } from './bus-status.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/shared/shared.module';


@NgModule({
  declarations: [
    BusStatusComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ComponentsModule,
    ReactiveFormsModule,
    BusStatusRoutingModule
  ]
})
export class BusStatusModule { }
