import { BaseCity } from './../../../models/basic-city.model';
import { BasicService } from './../../../services/basic.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, tap } from 'rxjs/operators';


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
    return this.myForm.get('city');
  }
  private get keywordFrmCtrl() {
    return this.myForm.get('keyword');
  }

  options: BaseCity[] = [];
  filteredOptions: Observable<BaseCity[]> = of([]);


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
    private BasicService: BasicService) {

  }
  async ngOnInit() {
    this.options = await this.BasicService.getCity();

    this.filteredOptions = this.cityFrmCtrl!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value)),
    );
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


  private _filter(value: string): BaseCity[] {
    let result = [];
    if (value) {
      const filterValue = value;
      result = this.options.filter(option => option.CityName.includes(filterValue))
    } else {
      result = this.options;
    }
    return result;
  }

}

