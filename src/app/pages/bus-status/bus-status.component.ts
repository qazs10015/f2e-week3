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
    keyword: this.fb.control('')
  });

  private get keywordFrmCtrl() {
    return this.myForm.get('keyword');
  }

  options: BaseCity[] = [];
  filteredOptions: Observable<BaseCity[]> = of([]);


  lstKeyboardBtn = [
    { displayName: '紅', class: 'keyboardRed' },
    { displayName: '藍', class: 'keyboardBlue' },
    { displayName: '1', class: 'keyboardLightGray' },
    { displayName: '2', class: 'keyboardLightGray' },
    { displayName: '3', class: 'keyboardLightGray' },
    { displayName: '棕', class: 'keyboardBrown' },
    { displayName: '綠', class: 'keyboardGreen' },
    { displayName: '4', class: 'keyboardLightGray' },
    { displayName: '5', class: 'keyboardLightGray' },
    { displayName: '6', class: 'keyboardLightGray' },
    { displayName: '黃', class: 'keyboardYellow' },
    { displayName: '橘', class: 'keyboardOrange' },
    { displayName: '7', class: 'keyboardLightGray' },
    { displayName: '8', class: 'keyboardLightGray' },
    { displayName: '9', class: 'keyboardLightGray' },
    { displayName: 'F', class: 'keyboardWhite' },
    { displayName: '更多', class: 'keyboardGray' },
    { displayName: 'C', class: 'keyboardLightGray' },
    { displayName: '0', class: 'keyboardLightGray' },
    { displayName: '', class: 'keyboardLightGray' },

  ]




  constructor(private fb: FormBuilder, private BasicService: BasicService) {

  }
  async ngOnInit() {
    this.options = await this.BasicService.getCity();

    this.filteredOptions = this.keywordFrmCtrl!.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      map((value) => this._filter(value)),
    );
  }

  backSpace() {
    const currentKeyword: string = this.keywordFrmCtrl?.value ?? '';

    this.keywordFrmCtrl?.patchValue(currentKeyword.slice(0, currentKeyword.length - 1));
  }

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

