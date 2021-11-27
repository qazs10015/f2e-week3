import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './more-button-dialog.component.html',
  styleUrls: ['./more-button-dialog.component.scss']
})
export class MoreButtonDialogComponent implements OnInit {

  options = [
    "L",
    "JOY",
    "幹線",
    "市民",
    "內科",
    "南軟",
    "花季",
    "貓空",
    "高鐵",
    "其他"
  ]
  constructor(private ref: MatDialogRef<MoreButtonDialogComponent>) { }

  ngOnInit(): void {
  }

  close(routeName: string) {
    this.ref.close(routeName);
  }

}
