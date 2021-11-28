import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavariteRoutingModule } from './favarite-routing.module';
import { FavariteComponent } from './favarite.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    FavariteComponent
  ],
  imports: [
    CommonModule,
    FavariteRoutingModule,
    SharedModule,
    ComponentsModule
  ]
})
export class FavariteModule { }
