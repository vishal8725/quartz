import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpLoadDataComponent } from './uploaddata/uploaddata.component';
import { LearnMoreComponent } from './learnmore/learnmore.component';
import { CompanyComponent } from './company/company.component';
import { CalenderComponent } from './calender/calender.component'
import { AuthService } from './shared/services/authService';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
        {
            path: '',
            component: DashboardComponent,
            pathMatch: 'full',
            canActivate: [AuthGuard]
        },
        {
            path: 'login',
            component: LoginComponent
        },
        {
            path: 'uploaddata',
            component: UpLoadDataComponent
        },
        {
            path: 'learnmore',
            component: LearnMoreComponent
        },
        {
            path: 'company',
            component: CompanyComponent
        },
        {
            path: 'dashboard',
            component: DashboardComponent,
            canActivate: [AuthGuard]
        },        
        {
            path: 'calender',
            component: CalenderComponent,
            canActivate: [AuthGuard]
        },
    ];

    @NgModule({
        imports: [
            RouterModule.forRoot(routes)
        ],
        exports: [
            RouterModule
        ],
        declarations: []
    })
    export class AppRoutingModule { }