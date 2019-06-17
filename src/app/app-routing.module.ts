import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentExploreComponent } from './student/student-explore/student-explore.component';
import { StudentMygroupsComponent } from './student/student-mygroups/student-mygroups.component';
import { StudentNavbarComponent } from './student/student-navbar/student-navbar.component';
import { StudentExploreCardComponent } from './student/student-explore-card/student-explore-card.component';
import { StudentMygroupsCardComponent } from './student/student-mygroups-card/student-mygroups-card.component';
import { StudentGroupForumsComponent } from './student/student-group-forums/student-group-forums.component';

const routes: Routes = [

  { path: 'student/explore', component: StudentExploreComponent },
  { path: 'student/dashboard', component: StudentMygroupsComponent },
  { path: 'student/group/:groupId', component: StudentGroupForumsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingStudentComponents = [StudentMygroupsComponent,
  StudentExploreComponent,
  StudentNavbarComponent,
  StudentExploreCardComponent,
  StudentMygroupsCardComponent,
  StudentGroupForumsComponent]
