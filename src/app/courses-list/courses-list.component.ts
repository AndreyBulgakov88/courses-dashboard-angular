import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '@app/services/courses.service';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  page = 1;
  pageSize = 9;
  headerFilter = '';
  filter = {name: 'all', header: 'All courses'};
  courses = [];
  isAdmin = false;
  isAuthenticated = false;

  constructor(private route: ActivatedRoute, private coursesService: CoursesService, private authService: AuthService) {}

  ngOnInit() {
    this.route.url
    .subscribe(
      url => {
        this.coursesService.setActiveContent(url[0]['path']);
      });

    this.authService.isAuthenticated()
    .subscribe(
      currentUser => {
        this.isAuthenticated = currentUser === null ? false : true;
        this.isAdmin = currentUser === null ? false : currentUser.role === 'admin';
      });

    this.coursesService.fetchCourses()
    .subscribe(
      () => this.courses = this.coursesService.fetchCoursesPage(this.page, this.pageSize)
    );

    this.coursesService.headerFilter
    .subscribe(
      headerFilter => this.headerFilter = headerFilter
    );
  }

  onClickFliterAllCourses() {
    this.filter = {name: 'all', header: 'All courses'};
  }

  onClickFilterFavouriteCourses() {
    this.filter = {name: 'favourites', header: 'Favourite courses'};
  }

  pageChange() {
    this.courses = this.coursesService.fetchCoursesPage(this.page, this.pageSize);
  }
}
