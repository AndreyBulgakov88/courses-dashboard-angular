import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '@app/services/courses.service';
import { AuthService } from '@app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit, OnDestroy {

  page = 1;
  pageSize = 9;
  headerFilter = '';
  filter = {name: 'all', header: 'All courses'};
  courses = [];
  isAdmin = false;
  isAuthenticated = false;
  activeContent = null;

  urlSubscription = null;
  isAuthenticatedSubscription = null;
  coursesSubscription = null;
  headerFilterSubscription = null;

  constructor(private route: ActivatedRoute, private coursesService: CoursesService, private authService: AuthService) {}

  ngOnInit() {
    this.urlSubscription = this.route.url
    .subscribe(
      url => {
        this.coursesService.setActiveContent(url[0]['path']);
        this.activeContent = url[0]['path'];
      });

    this.headerFilterSubscription = this.coursesService.headerFilter
    .subscribe(
      headerFilter => this.headerFilter = headerFilter
    );

    this.isAuthenticatedSubscription = this.authService.isAuthenticated()
    .subscribe(
      currentUser => {
        this.isAuthenticated = currentUser === null ? false : true;
        this.isAdmin = currentUser === null ? false : currentUser.role === 'admin';
      });

    this.coursesSubscription = this.coursesService.fetchCourses(this.activeContent)
    .subscribe(
      () => this.courses = this.coursesService.fetchCoursesPage(this.activeContent, this.page, this.pageSize)
    );
  }

  ngOnDestroy() {
    this.urlSubscription.unsubscribe();
    this.headerFilterSubscription.unsubscribe();
    this.coursesSubscription.unsubscribe();
    this.isAuthenticatedSubscription.unsubscribe();
  }

  onClickFliterAllCourses() {
    this.filter = {name: 'all', header: 'All courses'};
  }

  onClickFilterFavouriteCourses() {
    this.filter = {name: 'favourites', header: 'Favourite courses'};
  }

  pageChange() {
    this.courses = this.coursesService.fetchCoursesPage(this.activeContent, this.page, this.pageSize);
  }

  onClickAddCourse(id) {
    this.coursesService.addUserCourse(id);
  }

  onClickRemoveCourse(id) {
    this.coursesService.removeUserCourse(id);
  }
}
