import { MatDialogRef } from '@angular/material/dialog';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-keyboard-dialog',
  templateUrl: './keyboard-dialog.component.html',
  styleUrls: ['./keyboard-dialog.component.scss']
})
export class KeyboardDialogComponent implements OnInit {


  @Output() backSpaceEvent = new EventEmitter();
  @Output() showMoreEvent = new EventEmitter();
  @Output() resetEvent = new EventEmitter();
  @Output() searchEvent = new EventEmitter();
  constructor(private ref: MatDialogRef<KeyboardDialogComponent>) { }

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
