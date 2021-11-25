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
  options: BaseCity[] = [];
  filteredOptions: Observable<BaseCity[]> = of([]);

  constructor(private fb: FormBuilder, private BasicService: BasicService) {

  }
  async ngOnInit() {
    this.options = await this.BasicService.getCity();

    this.filteredOptions = this.myForm.get('keyword')!.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      map((value) => this._filter(value)),
      tap(v => console.log(v))
    );
  }

  search() {

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

