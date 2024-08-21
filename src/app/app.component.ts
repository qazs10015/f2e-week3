import { BasicService } from './services/basic.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';
import { GlobalService } from './services/global.service';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'f2e-week3';
  overlayRef = {} as OverlayRef;
  loadingBar$ = new BehaviorSubject<boolean>(false);
  constructor(
    private overlay: Overlay,
    public globalService: GlobalService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginService.login().subscribe((res) => {
      sessionStorage.setItem('token', res.access_token);
    });
  }

  ngOnDestroy(): void {
    // this.globalService.loadingBar$.complete();
    // this.overlayRef.detach();
  }
}
