import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { LeftNavComponent } from './leftnav/leftnav.component';
import { DashboardComponent } from './dashboard/dashboard.component'
import { CalenderComponent } from './calender/calender.component'
import { UpLoadDataComponent } from './uploaddata/uploaddata.component';
import { LearnMoreComponent } from './learnmore/learnmore.component';
import { CompanyComponent } from './company/company.component';
import { DataService } from './shared/services/dataService';
import { AuthService } from './shared/services/authService';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { ScrollEventModule } from 'ngx-scroll-event';
import { FileUploadModule } from 'ng2-file-upload';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    LeftNavComponent,
    DashboardComponent,
    CalenderComponent,
    UpLoadDataComponent,
    LearnMoreComponent,
    CompanyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    HttpClientModule,
    ScrollEventModule,
    FileUploadModule,
    NgbModule.forRoot()
  ],
  providers: [DataService, AuthService, AuthGuard, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
