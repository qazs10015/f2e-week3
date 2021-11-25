import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusStatusComponent } from './bus-status.component';

const routes: Routes = [{ path: '', component: BusStatusComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusStatusRoutingModule { }
