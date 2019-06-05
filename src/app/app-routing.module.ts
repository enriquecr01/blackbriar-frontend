import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { StudentExploreComponent } from './student/student-explore/student-explore.component';
import { StudentMygroupsComponent } from './student/student-mygroups/student-mygroups.component';
import { StudentNavbarComponent } from './student/student-navbar/student-navbar.component';
import { StudentExploreCardComponent } from './student/student-explore-card/student-explore-card.component';
import { StudentMygroupsCardComponent } from './student/student-mygroups-card/student-mygroups-card.component';
import { StudentGroupForumsComponent } from './student/student-group-forums/student-group-forums.component';

const routes: Routes = [

  { path: 'student/student-explore', component: StudentExploreComponent },
  { path: 'student/student-mygroups', component: StudentMygroupsComponent },
  { path: 'student/student-navbar', component: StudentMygroupsComponent },
  { path: 'student/student-exploreCard', component: StudentExploreCardComponent },
  { path: 'student/student-mygroupsCard', component: StudentMygroupsCardComponent },
  { path: 'student/student-groupforums', component: StudentGroupForumsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingStudentComponents = [StudentMygroupsComponent,
  StudentExploreComponent,
  StudentDashboardComponent,
  StudentNavbarComponent,
  StudentExploreCardComponent,
  StudentMygroupsCardComponent,
  StudentGroupForumsComponent]
