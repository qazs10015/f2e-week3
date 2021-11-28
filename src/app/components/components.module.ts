import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { SiteMapComponent } from './site-map/site-map.component';



@NgModule({
  declarations: [NavComponent, SiteMapComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    NavComponent,
    SiteMapComponent
  ]
})
export class ComponentsModule { }
