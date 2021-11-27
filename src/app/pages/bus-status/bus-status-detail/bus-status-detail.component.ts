import { forkJoin } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusRoute } from 'src/app/models/bus-route.model';
import { CityBusService } from 'src/app/services/city-bus.service';
import { map } from 'rxjs/operators';
import { BusN1EstimateTime } from 'src/app/models/bus-n1-estimate-time.model';
import { BusStopOfRoute } from 'src/app/models/bus-stop-of-route.model';


@Component({
  templateUrl: './bus-status-detail.component.html',
  styleUrls: ['./bus-status-detail.component.scss']
})
export class BusStatusDetailComponent implements OnInit {

  routeDetail: BusRoute = {} as BusRoute;

  lstStopData: any[] = [];


  /** 目前行駛方向
   *  0：去
   *  1：返
   */
  currentDirection = 0;

  constructor(
    private router: ActivatedRoute,
    private cityBusService: CityBusService
  ) { }

  async ngOnInit() {
    const city = this.router.snapshot.paramMap.get('city') ?? '';
    const routeName = this.router.snapshot.paramMap.get('routeName') ?? '';

    forkJoin([
      this.cityBusService.getRoute(city, routeName),
      this.cityBusService.getEstimatedTimeOfArrival(city, routeName, `PlateNumb ne '-1'`),

      this.cityBusService.getStops(city, routeName),]).pipe(
        map((val: any[]) => {

          this.routeDetail = val[0][0];

          let lstBusN1EstimateTime = (val[1] as BusN1EstimateTime[]);
          let lstStops = (val[2] as BusStopOfRoute[]);

          const result = lstStops.map(stop => {
            // 所有站點資訊
            const allStops = stop.Stops;

            // 同一方向的即時公車資訊
            const bus = lstBusN1EstimateTime
              .filter(n1 => n1.Direction === stop.Direction)
              .map(item => ({
                estimateTime: Math.floor((item.EstimateTime ?? 0) / 60),
                stopUID: item.StopUID,
                stopName: allStops.find(stop => stop.StopUID === item.StopUID)?.StopName,
                plantNumb: item.PlateNumb
              }));

            bus.sort((a, b) => a.estimateTime - b.estimateTime)

            return bus;

          });
          // debugger
          return result;
        })
      ).subscribe((val: any[]) => {

        console.log(val);
        this.lstStopData = val;
      })
  }

  showScheduleList() {

  }

  /** 切換 去 跟 返  */
  changeDirection() {
    this.currentDirection = this.currentDirection === 0 ? 1 : 0;
  }

}
