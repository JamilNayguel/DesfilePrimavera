import { Routes } from '@angular/router';

import { StartUserComponent } from './user/start-user/start-user.component';
import { LoginComponent } from './user/login/login.component';
import { AddRequestComponent } from './request/add-request/add-request.component';
import { ListRequestComponent } from './request/list-request/list-request.component';
import { ListRequestConsultationComponent } from './request/list-request-consultation/list-request-consultation.component';
import { ViewRequestComponent } from './request/view-request/view-request.component';
import { AuthGuard } from './auth/auth.guard'

export const routes: Routes = [
    { path: ' ',redirectTo : 'request/add-request'}, 
    { path: 'user/start-user', component: StartUserComponent,canActivate: [AuthGuard] },    
    { path: 'user/login', component: LoginComponent },  
    { path: 'request/add-request', component: AddRequestComponent },    
    { path: 'request/list-request', component: ListRequestComponent,canActivate: [AuthGuard] },   
    { path: 'list-request-consultation', component: ListRequestConsultationComponent,canActivate: [AuthGuard] },     
    { path: 'request/view-request', component: ViewRequestComponent,canActivate: [AuthGuard] }, 
];
