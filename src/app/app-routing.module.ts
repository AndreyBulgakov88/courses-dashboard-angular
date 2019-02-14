import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { ProfileComponent } from './account/profile/profile.component';
import { AuthGuard } from './services/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserCoursesListComponent } from './account/user-courses-list/user-courses-list.component';

const routes: Routes = [
  {path: '', redirectTo: '/browse-courses', pathMatch: 'full'},
  {path: 'profile', canActivate: [AuthGuard],
   children: [
     {path: '', component: ProfileComponent},
     {path: 'my-courses', component: UserCoursesListComponent},
     {path: '**', component: PageNotFoundComponent}
   ]},
  {path: 'browse-courses', component: CoursesListComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
