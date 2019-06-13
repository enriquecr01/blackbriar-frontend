// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule, routingStudentComponents } from './app-routing.module';
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
import { InstructorForumComponent } from './instructor/instructor-forum/instructor-forum.component';
import { LadingComponent } from './landing/lading/lading.component';

// Services
import { LoginService } from './login.service';
import { RegisterService } from './register.service';
import { GroupCardComponent } from './instructor/group-card/group-card.component';

//Angular material components

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPipe } from './filter.pipe';
import { InstructorGroupComponent } from './instructor/instructor-group/instructor-group.component';
import { StudentGroupForumsComponent } from './student/student-group-forums/student-group-forums.component';
import { StudentForumComponent } from './student/student-forum/student-forum.component';
import { NotificationsComponent } from './notifications/notifications.component';

import {MatMenuModule} from '@angular/material/menu';

import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ModalCreateForumComponent } from './instructor/modal-create-forum/modal-create-forum.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';


import { StudentsListComponent } from './instructor/students-list/students-list.component';
import { BannerGroupComponent } from './banner-group/banner-group.component';
import { ForumComponent } from './student/forum/forum.component';


const routes: Route[] = [
  { path: '', component: LadingComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'instructor/instructor-dashboard', component: InstructorDashboardComponent },
  { path: 'student/student-dashboard', component: StudentDashboardComponent },
  { path: 'instructor/instructor-group', component: InstructorGroupComponent },
  { path: 'student/group/:groupId/forum/:forumId', component: ForumComponent}

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
    StudentGroupForumsComponent,
    StudentForumComponent,
    NotificationsComponent,
    InstructorForumComponent,
    LadingComponent,
    ModalCreateForumComponent,
    StudentsListComponent,
    BannerGroupComponent,
    ForumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    AngularFontAwesomeModule,
    FormsModule,
    HttpClientModule,
    MaterializeModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatStepperModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule 
  ],
  providers: [
    LoginService,
    RegisterService,
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
