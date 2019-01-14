import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatCardModule, MatInputModule, MatSnackBarModule, MatToolbarModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EqualValidatorDirective } from './shared/equal.validator.directive';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { AuthGuard } from './auth.guard';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';

import { DashboardModule } from './dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';
import { HrModule } from './hr/hr.module';
import { EmployeeModule } from './employee/employee.module';
import { ProjectModule } from './project/project.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { ETNotificationService } from './shared/services/notification.service';
import { ETNotificationComponent } from './shared/notification/notification.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';

const myRoots: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'employee', redirectTo: '/employee' },
  { path: 'project', redirectTo: '/project' },
  { path: 'hr', redirectTo: '/hr' },
  { path: 'user', redirectTo: '/user' },
  { path: 'configuration', redirectTo: '/configuration' },
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', component: RegistrationComponent, pathMatch: 'full'},
      { path: 'registration', component: RegistrationComponent},
      { path: 'login', component: LoginComponent}
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    EqualValidatorDirective,
    ETNotificationComponent
  ],
  imports: [
    BrowserModule, HttpModule, HttpClientModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule,
    MatButtonModule, MatCardModule, MatInputModule, MatSnackBarModule, MatToolbarModule,
    DashboardModule,
    SharedModule,
    HrModule,
    EmployeeModule,
    ProjectModule,
    ConfigurationModule,
    RouterModule.forRoot(myRoots)
  ],
  providers: [ETNotificationService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
