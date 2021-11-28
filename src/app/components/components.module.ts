import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { SiteMapComponent } from './site-map/site-map.component';
import { CustomGoogleMapComponent } from './custom-google-map/custom-google-map.component';



@NgModule({
  declarations: [NavComponent, SiteMapComponent, CustomGoogleMapComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    NavComponent,
    SiteMapComponent,
    CustomGoogleMapComponent
  ]
})
export class ComponentsModule { }
