import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent, LoginModalComponent } from './header/header.component';
import { NavigationPanelComponent } from './navigation-panel/navigation-panel.component';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginModalComponent,
    NavigationPanelComponent,
    CoursesListComponent
  ],
  entryComponents: [
    LoginModalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
