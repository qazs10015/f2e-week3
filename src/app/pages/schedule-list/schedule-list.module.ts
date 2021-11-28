import { ComponentsModule } from 'src/app/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleListRoutingModule } from './schedule-list-routing.module';
import { ScheduleListComponent } from './schedule-list.component';


@NgModule({
  declarations: [
    ScheduleListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    ScheduleListRoutingModule
  ]
})
export class ScheduleListModule { }
