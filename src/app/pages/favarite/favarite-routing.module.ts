import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavariteComponent } from './favarite.component';

const routes: Routes = [{ path: '', component: FavariteComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavariteRoutingModule { }
