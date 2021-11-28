import { DeviceDetectorService, DeviceType } from 'ngx-device-detector';
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

  DeviceType = DeviceType;
  deviceType = DeviceType.Desktop;

  constructor(private ref: MatDialogRef<MoreButtonDialogComponent>, private deviceDetectorService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.deviceType = this.deviceDetectorService.getDeviceInfo().deviceType as DeviceType;
  }

  close(routeName: string) {
    this.ref.close(routeName);
  }

}
