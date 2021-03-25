import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IntentExampleComponent } from './components/intent-example/intent-example.component';
import { IntentsComponent } from './components/intents/intents.component';
import { ResponsesComponent } from './components/responses/responses.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path:'intents',
    component: IntentsComponent
  },
  {
    path: 'responses',
    component: ResponsesComponent
  },
  {
    path: 'chats',
    component: ChatComponent
  },{
    path: 'example/:intentId',
    component: IntentExampleComponent
  }


,
  {
    path: '**',
    redirectTo: 'chats'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
