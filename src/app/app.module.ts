import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntentsComponent } from './components/intents/intents.component';
import { ResponsesComponent } from './components/responses/responses.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ResponseListComponent } from './components/response-list/response-list.component';
import { FooterComponent } from './includes/footer/footer.component';
import { HeaderComponent } from './includes/header/header.component';
import { SidenavComponent } from './includes/sidenav/sidenav.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChatComponent } from './components/chat/chat.component';
import { ChatService } from './services/chat-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IntentExampleComponent } from './components/intent-example/intent-example.component';

@NgModule({
  declarations: [
    AppComponent,
    IntentsComponent,
    ResponsesComponent,
    DashboardComponent,
    ResponseListComponent,
    FooterComponent,
    HeaderComponent,
    SidenavComponent,
    ChatComponent,
    IntentExampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule,
    AngularSvgIconModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
