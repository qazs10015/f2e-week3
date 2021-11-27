import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './route-image-dialog.component.html',
  styleUrls: ['./route-image-dialog.component.scss']
})
export class RouteImageDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
    debugger
  }

}
