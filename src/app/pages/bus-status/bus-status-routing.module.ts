import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusStatusDetailComponent } from './bus-status-detail/bus-status-detail.component';
import { BusStatusComponent } from './bus-status.component';

const routes: Routes = [{ path: '', component: BusStatusComponent },
{ path: ':city/:routeName', component: BusStatusDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusStatusRoutingModule { }
