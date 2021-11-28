import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusStatusRoutingModule } from './bus-status-routing.module';
import { BusStatusComponent } from './bus-status.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { BusStatusDetailComponent } from './bus-status-detail/bus-status-detail.component';
import { CustomGoogleMapComponent } from './custom-google-map/custom-google-map.component';


@NgModule({
  declarations: [
    BusStatusComponent,
    BusStatusDetailComponent,
    CustomGoogleMapComponent
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
