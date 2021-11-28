import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-schedule-list-dialog',
  templateUrl: './schedule-list-dialog.component.html',
  styleUrls: ['./schedule-list-dialog.component.scss']
})
export class ScheduleListDialogComponent implements OnInit {

  goData: any[] = [];
  backData: any[] = [];

  lstSchedule: any[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) private data: any[]) { }

  ngOnInit(): void {
    this.lstSchedule = this.data;
    // if (this.data && this.data.length > 0) {
    //   this.goData = this.data[0];
    //   if (this.data.length > 1) {
    //     this.backData = this.data[1];
    //   }
    // }

  }

}

