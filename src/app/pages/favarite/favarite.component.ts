import { forkJoin } from 'rxjs';
import { CityBusService } from 'src/app/services/city-bus.service';
import { UtilityService } from 'src/app/services/utility.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RouteImageDialogComponent } from 'src/app/dialogs/route-image-dialog/route-image-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favarite',
  templateUrl: './favarite.component.html',
  styleUrls: ['./favarite.component.scss']
})
export class FavariteComponent implements OnInit {

  displayFavoriteList: any[] = [];

  constructor(
    private dialog: MatDialog,
    private cityBusService: CityBusService,
    private utilityService: UtilityService,
    private router: Router,
  ) { }

  async ngOnInit() {
    const favoriteList = this.utilityService.getFavoriteList();

    const cityRouteData = favoriteList.map(item => this.cityBusService.getRoute(item.city));

    forkJoin(cityRouteData).subscribe(val => {
      val.forEach(cityRoute => {
        this.displayFavoriteList = (cityRoute.filter(route => favoriteList.find(f => f.routeName === route.RouteName.Zh_tw && f.city === route.City)));
      });
    });
  }


  showRouteImage(imageUrl: string) {
    const config: MatDialogConfig = {
      data: imageUrl,
      width: '60vw',
      // height: '60vh'
    }
    const ref = this.dialog.open(RouteImageDialogComponent, config);


  }

  /** 加入收藏 */
  addFavorite(city: string, routeName: string) {
    this.utilityService.addOrRemoveFavorite(city, routeName);
  }


  /** 導頁 */
  redirect(city: string, routeName: string) {
    this.router.navigate(['/busStatus', city, routeName])
  }

}
