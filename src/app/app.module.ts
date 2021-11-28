import { HttpClientJsonpModule, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from '../auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ComponentsModule } from './components/components.module';
import { SharedModule } from './shared/shared.module';
import { MoreButtonDialogComponent } from './dialogs/more-button-dialog/more-button-dialog.component';
import { RouteImageDialogComponent } from './dialogs/route-image-dialog/route-image-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MoreButtonDialogComponent,
    RouteImageDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ComponentsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],

  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
