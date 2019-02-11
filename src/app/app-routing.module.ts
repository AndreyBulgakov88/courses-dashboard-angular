import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';

const routes: Routes = [
  {path: '', redirectTo: '/courses/browse-courses', pathMatch: 'full'},
  {path: 'courses/:type', component: CoursesListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
