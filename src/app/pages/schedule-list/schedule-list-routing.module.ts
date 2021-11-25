import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleListComponent } from './schedule-list.component';

const routes: Routes = [{ path: '', component: ScheduleListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleListRoutingModule { }
