import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  private storageName = 'favoriteList';

  constructor() { }

  /** 加入收藏 */
  addOrRemoveFavorite(city: string, routeName: string) {

    const favoriteList = this.getFavoriteList();
    const idx = favoriteList.findIndex(item => item.city === city && item.routeName === routeName);
    if (idx > -1) {
      favoriteList.splice(idx, 1);
    } else {
      favoriteList.push({ city, routeName });
    }

    localStorage.setItem(this.storageName, JSON.stringify(favoriteList));
  }

  /** 是否已儲存 */
  isSaveFavorite(city: string, routeName: string) {


    const favoriteList = this.getFavoriteList();
    const idx = favoriteList.findIndex(item => item.city === city && item.routeName === routeName);
    return idx > -1;
  }

  /** 取出目前全部的收藏清單 */
  getFavoriteList() {
    const storageData = localStorage.getItem(this.storageName) ?? '';
    const favoriteList = storageData === '' ? [] : JSON.parse(storageData) as any[];
    return favoriteList;
  }

}
