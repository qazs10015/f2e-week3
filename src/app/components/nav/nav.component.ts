import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnChanges {

  @Input() detailMenuStyle = false;

  logoImg = '';
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    // 依照傳入的參數決定 logo 顯示哪一張
    this.changeSrc(changes['detailMenuStyle'].currentValue);
  }

  ngOnInit(): void {
  }

  private changeSrc(detailMenuStyle: boolean) {
    const imgName = detailMenuStyle ? 'logo_detail.png' : 'logo.png';
    this.logoImg = `assets/images/${imgName}`;
  }

}
