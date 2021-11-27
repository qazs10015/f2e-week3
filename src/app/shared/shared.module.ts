import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ScrollingModule } from '@angular/cdk/scrolling';
const materialModules = [
  ScrollingModule,
  MatAutocompleteModule,
  MatInputModule,
  MatDialogModule,
  MatRadioModule,
  MatSelectModule,
  MatIconModule,
  MatFormFieldModule,
  MatSlideToggleModule
]
const thirdModules = [GoogleMapsModule, NgxPaginationModule]


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    ...materialModules,
    ...thirdModules,
  ]
})
export class SharedModule { }
