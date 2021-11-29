import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { SiteMapComponent } from './site-map/site-map.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { LoadingBarComponent } from './loading-bar/loading-bar.component';



@NgModule({
  declarations: [NavComponent, SiteMapComponent, KeyboardComponent, LoadingBarComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    NavComponent,
    SiteMapComponent,
    KeyboardComponent
  ]
})
export class ComponentsModule { }
