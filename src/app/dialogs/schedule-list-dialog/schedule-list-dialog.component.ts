import { DeviceDetectorService, DeviceType } from 'ngx-device-detector';
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



  DeviceType = DeviceType;
  deviceType = DeviceType.Desktop;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any[], private deviceDetectorService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.deviceType = this.deviceDetectorService.getDeviceInfo().deviceType as DeviceType;

    this.lstSchedule = this.data;

    // if (this.data && this.data.length > 0) {
    //   this.goData = this.data[0];
    //   if (this.data.length > 1) {
    //     this.backData = this.data[1];
    //   }
    // }

  }

}

