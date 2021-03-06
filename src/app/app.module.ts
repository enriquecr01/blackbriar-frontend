import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule, routingStudentComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { Route, RouterModule } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterializeModule } from 'angular2-materialize';
import { EditorModule } from '@tinymce/tinymce-angular';
import 'materialize-css';

import { LoginComponent } from './login/login.component';
import { NavbarNoLoggedComponent } from './navbar-no-logged/navbar-no-logged.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { NavbarLoggedComponent } from './navbar-logged/navbar-logged.component';
import { InstructorDashboardComponent } from './instructor/instructor-dashboard/instructor-dashboard.component';
import { NavbarInstructorComponent } from './instructor/navbar-instructor/navbar-instructor.component';
import { InstructorForumComponent } from './instructor/instructor-forum/instructor-forum.component';
import { LadingComponent } from './landing/lading/lading.component';
import { WarriorAlertComponent } from './notifications/warrioralert.component';
import { WarlockAlertComponent } from './notifications/warlockalert.component'

import { LoginService } from './login.service';
import { RegisterService } from './register.service';
import { GroupCardComponent } from './instructor/group-card/group-card.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPipe } from './instructor/filterPipe';
import { InstructorGroupComponent } from './instructor/instructor-group/instructor-group.component';
import { StudentGroupForumsComponent } from './student/student-group-forums/student-group-forums.component';
import { StudentForumComponent } from './student/student-forum/student-forum.component';
import { NotificationsComponent } from './notifications/notifications.component';

import { MatMenuModule } from '@angular/material/menu';
import { MarkdownEditorComponent } from './markdown-editor/markdown-editor.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';

import { StudentsListComponent } from './instructor/students-list/students-list.component';
import { BannerGroupComponent } from './banner-group/banner-group.component';
import { ForumUiComponent } from './instructor/forum-ui/forum-ui.component';
import { ForumComponent } from './student/forum/forum.component';
import { CreateComponent } from './components/forums/create/create.component';
import { DisplayComponent } from './components/forums/display/display.component';
import { DisplayUsersComponent } from './components/forums/display-users/display-users.component';
import { CommentComponent } from './components/comment/comment.component';
import { TokenInterceptor } from './services/token.interceptor';
import { ForumResponseComponent } from './components/forum-response/forum-response.component';
import { InstructorForumDisplayComponent } from './components/forums/instructor-forum-display/instructor-forum-display.component';
import { HealerAlertComponent } from './notifications/healeralert.component';
import { HealerInfoComponent } from './notifications/healerinfo.component';
import { ForumResponseFeedbackComponent } from './components/forum-response-feedback/forum-response-feedback.component';
import { ForumEditModal } from './instructor/group-card/edit-forum-modal';
import { ScoreReportComponent } from './notifications/scorereport.component';

const routes: Route[] = [
  { path: '', component: LadingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'instructor/dashboard', component: InstructorDashboardComponent },
  { path: 'instructor/group/:groupId', component: InstructorGroupComponent },
  { path: 'instructor/group/:groupId/forum/:forumId', component: ForumUiComponent },
  { path: 'student/group/:groupId/forum/:forumId', component: ForumComponent }
];

@NgModule({
  entryComponents: [
    WarriorAlertComponent,
    WarlockAlertComponent,
    HealerAlertComponent,
    HealerInfoComponent,
    ForumEditModal,
    ScoreReportComponent
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarNoLoggedComponent,
    HomeComponent,
    RegisterComponent,
    NavbarLoggedComponent,
    InstructorDashboardComponent,
    GroupCardComponent,
    NavbarInstructorComponent,
    routingStudentComponents,
    FilterPipe,
    InstructorGroupComponent,
    StudentGroupForumsComponent,
    WarriorAlertComponent,
    WarlockAlertComponent,
    HealerAlertComponent,
    HealerInfoComponent,
    ScoreReportComponent,
    StudentForumComponent,
    NotificationsComponent,
    InstructorForumComponent,
    MarkdownEditorComponent,
    LadingComponent,
    StudentsListComponent,
    BannerGroupComponent,
    ForumUiComponent,
    ForumComponent,
    CreateComponent,
    DisplayComponent,
    DisplayUsersComponent,
    CommentComponent,
    ForumResponseComponent,
    InstructorForumDisplayComponent,
    ForumResponseFeedbackComponent, 
    ForumEditModal
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    AngularFontAwesomeModule,
    FormsModule,
    EditorModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterializeModule,
    BrowserAnimationsModule,
    MatMenuModule,
    EditorModule,
    MatStepperModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTooltipModule
  ],
  providers: [
    LoginService,
    RegisterService,
    AppComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
