import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceDetectorService, DeviceType } from 'ngx-device-detector';
import { forkJoin, timer } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BusN1EstimateTime } from 'src/app/models/bus-n1-estimate-time.model';
import { BusRoute } from 'src/app/models/bus-route.model';
import { BusStopOfRoute } from 'src/app/models/bus-stop-of-route.model';
import { BusVehicleInfo } from 'src/app/models/bus-vehicle-info.model';
import { CityBusService } from 'src/app/services/city-bus.service';



@Component({
  templateUrl: './bus-status-detail.component.html',
  styleUrls: ['./bus-status-detail.component.scss']
})
export class BusStatusDetailComponent implements OnInit {

  routeDetail: BusRoute = {} as BusRoute;

  isShowMobileMap = false;

  lstStopData: any[] = [];

  /** 目前行駛方向
   *  0：去
   *  1：返
   */
  currentDirection = 0;

  /** 出發站 名稱 */
  departureStopName = '';

  /** 終點站 名稱*/
  distinationStopName = '';

  /** 20秒更新一次 */
  countDownTimer = 20;

  timer = timer(0, 1000).pipe(tap((v) => {

    if (this.countDownTimer === 1) {
      this.countDownTimer = 20;
      this.search();
    } else this.countDownTimer -= 1
    // console.log(this.countDownTimer - v);
  }));

  DeviceType = DeviceType;
  deviceType = DeviceType.Desktop;

  constructor(
    private router: ActivatedRoute,
    private cityBusService: CityBusService,
    public deviceDetectorService: DeviceDetectorService,
  ) { }

  async ngOnInit() {
    this.search();
    this.deviceType = this.deviceDetectorService.getDeviceInfo().deviceType as DeviceType;

  }

  search() {
    const city = this.router.snapshot.paramMap.get('city') ?? '';
    const routeName = this.router.snapshot.paramMap.get('routeName') ?? '';

    forkJoin([
      this.cityBusService.getRoute(city, routeName),
      this.cityBusService.getEstimatedTimeOfArrival(city, routeName, `PlateNumb ne '-1'`),
      this.cityBusService.getStops(city, routeName),
      this.cityBusService.getVehicle(city, false),]).pipe(
        map((val: any[]) => {

          // 路線資訊
          this.routeDetail = val[0][0];

          // 即時公車資訊
          let lstBusN1EstimateTime = (val[1] as BusN1EstimateTime[]);
          // 站點清單資訊
          let lstStops = (val[2] as BusStopOfRoute[]);
          // 公車有無障礙車位資訊
          let lstVehicle = (val[3] as BusVehicleInfo[]);

          const bus = lstStops.map(stopInfo => {
            // 所有站點資訊
            const allStops = stopInfo.Stops;

            // 以站點資料為底，mapping 公車資訊
            return allStops.map(stop => {
              const bus = lstBusN1EstimateTime.find(n1 => (n1.StopUID === stop.StopUID && n1.Direction === stopInfo.Direction))
              let result: any = {};
              let statusMsg = '';
              if (bus && bus.StopUID === stop.StopUID && bus.Direction === stopInfo.Direction) {
                const estimateTime = Math.floor((bus.EstimateTime ?? 0) / 60);

                // 依照到站時間派判斷狀態訊息
                switch (estimateTime) {
                  case 0:
                    statusMsg = '進站中';
                    break;
                  case 1:
                    statusMsg = '即將進站';
                    break;
                  default:
                    statusMsg = `${estimateTime} 分鐘`;
                    break;
                }

                result = {
                  estimateTime,
                  stopUID: bus.StopUID,
                  stopName: stop.StopName.Zh_tw,
                  plateNumb: bus.PlateNumb,
                  statusMsg,
                  vehicle: lstVehicle.find(v => v.PlateNumb === bus.PlateNumb)?.VehicleType,
                  stopPos: stop.StopPosition,
                }
              } else {
                // 無法 mappging 的資料
                result = {
                  estimateTime: -1,
                  stopUID: stop.StopUID,
                  stopName: stop.StopName.Zh_tw,
                  plateNumb: '---',
                  statusMsg: '未發車',
                  vehicle: '',
                  stopPos: stop.StopPosition
                }
              }
              return result;
            })
          });

          return bus;
        })
      ).subscribe((val: any[]) => {

        console.log(val);
        this.lstStopData = val[this.currentDirection];
        this.departureStopName = this.lstStopData[0].stopName;
        this.distinationStopName = this.lstStopData[this.lstStopData.length - 1].stopName;

      })

  }

  showMobileMap() {
    this.isShowMobileMap = !this.isShowMobileMap;
  }
  showScheduleList() {

  }

  /** 切換 去 跟 返  */
  changeDirection() {
    this.currentDirection = this.currentDirection === 0 ? 1 : 0;
    this.search();
  }

}
