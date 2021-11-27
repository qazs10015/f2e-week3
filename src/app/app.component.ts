import { BasicService } from './services/basic.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'f2e-week3';
  constructor() {

  }
  async ngOnInit() {
  }
}
