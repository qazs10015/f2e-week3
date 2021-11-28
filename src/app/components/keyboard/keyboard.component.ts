import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {

  @Output() backSpaceEvent = new EventEmitter();
  @Output() showMoreEvent = new EventEmitter();
  @Output() resetEvent = new EventEmitter();
  @Output() searchEvent = new EventEmitter();

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

  constructor() { }

  ngOnInit(): void {
  }


  backSpace() {
    this.backSpaceEvent.emit();
  }
  showMoreBtn() {
    this.showMoreEvent.emit();
  }
  reset() {
    this.resetEvent.emit();
  }
  search(displayName: string) {
    this.searchEvent.emit(displayName);
  }
}
