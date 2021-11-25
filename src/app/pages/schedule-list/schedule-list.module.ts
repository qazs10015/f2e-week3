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
    ScheduleListRoutingModule
  ]
})
export class ScheduleListModule { }
