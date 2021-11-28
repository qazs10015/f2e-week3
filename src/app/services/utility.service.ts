import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  /** 加入收藏 */
  addOrRemoveFavorite(city: string, routeName: string) {
    const storageName = 'favoriteList';
    const storageData = localStorage.getItem(storageName) ?? '';
    const favoriteList = storageData === '' ? [] : JSON.parse(storageData) as any[];
    const idx = favoriteList.findIndex(item => item.city === city && item.routeName === routeName);
    if (idx > -1) {
      favoriteList.splice(idx, 1);
    } else {
      favoriteList.push({ city, routeName });
    }

    localStorage.setItem(storageName, JSON.stringify(favoriteList));
  }

  isSaveFavorite(city: string, routeName: string) {
    const storageName = 'favoriteList';
    const storageData = localStorage.getItem(storageName) ?? '';
    const favoriteList = storageData === '' ? [] : JSON.parse(storageData) as any[];
    const idx = favoriteList.findIndex(item => item.city === city && item.routeName === routeName);
    return idx > -1;
  }
}
