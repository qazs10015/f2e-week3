import { LocatorService } from './../../../services/locator.service';
import { LocationService } from './../../../services/location.service';
import { CityBusService } from './../../../services/city-bus.service';
import { BaseCity } from './../../../models/basic-city.model';
import { BasicService } from './../../../services/basic.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'app-bus-status',
  templateUrl: './bus-status.component.html',
  styleUrls: ['./bus-status.component.scss']
})
export class BusStatusComponent implements OnInit {

  myForm = this.fb.group({
    city: this.fb.control(''),
    keyword: this.fb.control('')
  });

  private get cityFrmCtrl() {
    return this.myForm.get('city')!;
  }
  private get keywordFrmCtrl() {
    return this.myForm.get('keyword')!;
  }

  options: BaseCity[] = [];
  // filteredOptions: Observable<BaseCity[]> = of([]);


  /** 鍵盤選項 */
  lstKeyboardBtn = [
    { displayName: '紅', className: 'keyboardRed' },
    { displayName: '藍', className: 'keyboardBlue' },
    { displayName: '1', className: 'keyboardLightGray' },
    { displayName: '2', className: 'keyboardLightGray' },
    { displayName: '3', className: 'keyboardLightGray' },
    { displayName: '棕', className: 'keyboardBrown' },
    { displayName: '綠', className: 'keyboardGreen' },
    { displayName: '4', className: 'keyboardLightGray' },
    { displayName: '5', className: 'keyboardLightGray' },
    { displayName: '6', className: 'keyboardLightGray' },
    { displayName: '黃', className: 'keyboardYellow' },
    { displayName: '橘', className: 'keyboardOrange' },
    { displayName: '7', className: 'keyboardLightGray' },
    { displayName: '8', className: 'keyboardLightGray' },
    { displayName: '9', className: 'keyboardLightGray' },
    { displayName: 'F', className: 'keyboardWhite' },
    { displayName: '更多', className: 'keyboardGray' },
    { displayName: 'C', className: 'keyboardLightGray' },
    { displayName: '0', className: 'keyboardLightGray' },
    { displayName: '', className: 'keyboardLightGray' },
  ]

  constructor(
    private fb: FormBuilder,
    private cityBusService: CityBusService,
    private locationService: LocationService,
    private locatorService: LocatorService,
    private BasicService: BasicService) {

  }
  async ngOnInit() {
    // form 有異動就直接搜尋資料
    this.myForm.valueChanges.pipe(
      switchMap(val => {
        const city = val?.city ?? '';
        const keyword = val?.keyword ?? '';
        return this.cityBusService.getRealTimeByFrequencyBus(city, keyword);
      })
    ).subscribe(val => {
      console.log(val);
    });


    // 取得縣市清單
    this.options = await this.BasicService.getCity();
    // 取得目前座標
    const currentPos = await this.locationService.getPosition();
    // 取得目前行政區
    const currentDistrict = await this.locatorService.getDistrict(currentPos.lat, currentPos.lng);
    // 將目前行政區設為預設搜尋選項
    this.myForm.patchValue({ city: currentDistrict[0].City });


  }

  /** 退回鍵 */
  backSpace() {
    const currentKeyword: string = this.keywordFrmCtrl?.value ?? '';

    this.keywordFrmCtrl?.patchValue(currentKeyword.slice(0, currentKeyword.length - 1));
  }

  /** 搜尋資料 */
  search(keyword: string) {
    const currentKeyword = this.keywordFrmCtrl?.value ?? '';

    this.keywordFrmCtrl?.patchValue(currentKeyword + keyword);
  }

  changeCity(e: any) {
    this.cityFrmCtrl.setValue(e.target.value)
  }


  // private _filter(value: string): BaseCity[] {
  //   let result = [];
  //   if (value) {
  //     const filterValue = value;
  //     result = this.options.filter(option => option.CityName.includes(filterValue))
  //   } else {
  //     result = this.options;
  //   }
  //   return result;
  // }

}

