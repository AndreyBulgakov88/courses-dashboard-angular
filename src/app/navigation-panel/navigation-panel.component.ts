import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
  query
} from '@angular/animations';
import { CoursesService } from '@app/services/courses.service';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-navigation-panel',
  templateUrl: './navigation-panel.component.html',
  styleUrls: ['./navigation-panel.component.scss'],
  animations: [
    trigger('addCategory', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, position: 'absolute' }),
        ], {optional: true}),

        query(':enter', [
          animate('0.4s', style({ opacity: 1 })),
        ], {optional: true}),
      ]),
    ]),
  ],
})
export class NavigationPanelComponent implements OnInit {

  addingCategory = false;
  activeContent = null;
  isAuthenticated = false;
  isAdmin = false;
  categories = [];

  private addInputElRef: ElementRef;
  @ViewChild('addInput') set addInput(elRef: ElementRef) {
    this.addInputElRef = elRef;
  }

  constructor(private coursesService: CoursesService,
              private authService: AuthService) { }

  ngOnInit() {
    this.authService.isAuthenticated()
    .subscribe(
      currentUser => {
        this.isAuthenticated = currentUser === null ? false : true;
        this.isAdmin = currentUser === null ? false : currentUser.role === 'admin';
      });

    this.coursesService.fetchCategories()
    .subscribe(
      categories => {
        this.categories = categories;
      });
  }

  // onClickFavourite(category) {
  //   this.coursesService.toggleCategoryFavourite(category);
  // }

  onChangeFilter(id) {
    this.coursesService.toggleFilter(id);
  }

 toggleAddCategory() {
    this.addingCategory = !this.addingCategory;

    if (this.addingCategory) {
      setTimeout(() => this.addInputElRef.nativeElement.focus());
    }
  }

  onKeydownAddCategory(e, colorId) {
    if (e.keyCode === 13) {
      this.coursesService.addCategory(e.target.value, colorId);
      this.addingCategory = false;
    } else if (e.keyCode === 27) {
      this.addingCategory = false;
    }
  }
}
