// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule , routingStudentComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { Route, RouterModule } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HttpClientModule } from '@angular/common/http';
import { MaterializeModule } from 'angular2-materialize';
import 'materialize-css';

// Components
import { LoginComponent } from './login/login.component';
import { NavbarNoLoggedComponent } from './navbar-no-logged/navbar-no-logged.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { NavbarLoggedComponent } from './navbar-logged/navbar-logged.component';
import { InstructorDashboardComponent } from './instructor/instructor-dashboard/instructor-dashboard.component';
import { NavbarInstructorComponent } from './instructor/navbar-instructor/navbar-instructor.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';

// Services
import { LoginService } from './login.service';
import { RegisterService } from './register.service';
import { GroupCardComponent } from './instructor/group-card/group-card.component';

//Angular material components

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FilterPipe } from './filter.pipe';
import { InstructorGroupComponent } from './instructor/instructor-group/instructor-group.component';
import { NotificationsComponent } from './notifications/notifications.component';

const routes: Route[] = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'instructor/instructor-dashboard', component: InstructorDashboardComponent},
  {path: 'student/student-dashboard', component: StudentDashboardComponent},
  {path: 'instructor/instructor-group', component: InstructorGroupComponent}
  
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarNoLoggedComponent,
    HomeComponent,
    RegisterComponent,
    NavbarLoggedComponent,
    InstructorDashboardComponent,
    GroupCardComponent,
    StudentDashboardComponent,
    NavbarInstructorComponent,
    routingStudentComponents,
    FilterPipe,
    InstructorGroupComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    RouterModule.forRoot(routes),
    AngularFontAwesomeModule,
    FormsModule,
    HttpClientModule,
    MaterializeModule,
    
    BrowserAnimationsModule
  ],
  providers: [
    LoginService,
    RegisterService,
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
