import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'busStatus', loadChildren: () => import('./pages/bus-status/bus-status.module').then(m => m.BusStatusModule) },
  { path: 'favarite', loadChildren: () => import('./pages/favarite/favarite.module').then(m => m.FavariteModule) },
  { path: 'station', loadChildren: () => import('./pages/station/station.module').then(m => m.StationModule) },
  { path: 'scheduleList', loadChildren: () => import('./pages/schedule-list/schedule-list.module').then(m => m.ScheduleListModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
