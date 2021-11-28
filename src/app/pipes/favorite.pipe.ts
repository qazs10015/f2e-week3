import { UtilityService } from 'src/app/services/utility.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'favorite'
})
export class FavoritePipe implements PipeTransform {

  constructor(private utilityService: UtilityService) {

  }
  transform(val: any): boolean {
    return this.utilityService.isSaveFavorite(val.City, val.RouteName.Zh_tw);
  }

}
