import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-map',
  templateUrl: './site-map.component.html',
  styleUrls: ['./site-map.component.scss']
})
export class SiteMapComponent implements OnInit {

  @Input() pageName = '';
  @Input() detailMenuStyle = false;
  constructor() { }

  ngOnInit(): void {
  }

}
