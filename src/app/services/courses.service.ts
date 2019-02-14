import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  isAuthenticated = false;

  private palette = ['#001f3f', '#39CCCC', '#01FF70', '#FF4136',
                     '#B10DC9', '#DDDDDD', '#7FDBFF', '#2ECC40',
                     '#FF851B', '#F012BE', '#AAAAAA', '#0074D9',
                     '#3D9970', '#FFDC00', '#85144b', '#111111'];

  private categories = new BehaviorSubject([
    {id: 0, name: 'UI/UX', colorId: 0},
    {id: 1, name: 'Industrial Design', colorId: 1},
    {id: 2, name: 'Architecture', colorId: 2}
  ]);

  private categoriesFilter = [];

  private courses = [
    {id: 0, name: 'Hackdesign', description: 'An easy to follow design course for people who do amazing things. ', categoryId: 0},
    {id: 1, name: 'ecorp trainings', description: 'Take a world-class online course.', categoryId: 0},
    {id: 2, name: 'Springboard', description: 'If you want a career in UX/UI design this course is perfect for you. ', categoryId: 0},
    {id: 3, name: 'KHAN ACADEMY', description: 'Our mission is to provide a world-class education to anyone, anywhere. ', categoryId: 0},
    {id: 4, name: 'Open Learning', description: 'Our aim is to create high-quality courses to improve learning. ', categoryId: 1},
    {id: 5, name: 'ACAMICA', description: 'Learn to industrial design from industry leaders. ', categoryId: 1},
    {id: 6, name: 'APNA COURSE', description: 'All courses are delivered only by top trainers and professionals. ', categoryId: 1},
    {id: 7, name: 'Eventbrite', description: 'Get everything you need to plan, promote and manage your best event.. ', categoryId: 1},
    {id: 8, name: 'HARVARD Extension School', description: 'We offer over 700 courses to help you gain new perspectives. ', categoryId: 2},
    {id: 9, name: 'MASTERCLASS', description: 'Take online classes from the world’s best. ', categoryId: 2},
    {id: 10, name: 'Future Learn', description: 'Future learn named best user experience at the UXUK Awards. ', categoryId: 2},
    {id: 11, name: 'THE BIG KNOW', description: 'Learn from the brands you love. ', categoryId: 2},
  ];

  private filteredCourses = new BehaviorSubject([]);
  private userCourses = new BehaviorSubject([]);
  private filteredUserCourses = new BehaviorSubject([]);

  private activeContent = new BehaviorSubject(null);

  headerFilter: EventEmitter<any> = new EventEmitter();

  constructor(private authService: AuthService) {
    this.filteredCourses.next(this.courses);

    this.authService.isAuthenticated()
    .subscribe(
      currentUser => {
        this.isAuthenticated = currentUser === null ? false : true;
      });
  }

  setActiveContent(type) {
    this.activeContent.next(type);
  }

  getActiveContent() {
    return this.activeContent;
  }

  addCategory(name, colorId) {
    const newCategory = { id: this.categories.value.length, name, colorId};
    this.categories.next([...this.categories.value, newCategory]);
  }

  fetchCategories() {
    return this.categories;
  }

  toggleFilterCategories(adding, id) {
    if (adding) {
      this.categoriesFilter = [...this.categoriesFilter, id];
    } else {
      const modifiedArrayCategories = this.categoriesFilter;
      modifiedArrayCategories.splice(this.categoriesFilter.indexOf(id), 1);

      this.categoriesFilter = [...modifiedArrayCategories];
    }

    let modifiedArrayCourses = [];
    if (this.categoriesFilter.length === 0) {
      modifiedArrayCourses = this.courses;
    } else {
      modifiedArrayCourses = this.courses.filter(course => this.categoriesFilter.indexOf(course.categoryId) !== -1);
    }

    this.filteredCourses.next([...modifiedArrayCourses]);

    let modifiedArrayUserCourses = [];
    if (this.categoriesFilter.length === 0) {
      modifiedArrayUserCourses = this.userCourses.value;
    } else {
      modifiedArrayUserCourses = this.userCourses.value.filter(course => this.categoriesFilter.indexOf(course.categoryId) !== -1);
    }

    this.filteredUserCourses.next([...modifiedArrayUserCourses]);
  }

  // toggleCategoryFavourite(category) {
  //   const categoryIndex = this.categories.value.indexOf(category);
  //   const categoriesCopy = this.categories.value.slice();

  //   categoriesCopy[categoryIndex]['fav'] = categoriesCopy[categoryIndex]['fav'] === null ? true : !categoriesCopy[categoryIndex]['fav'];
  //   this.categories.next(categoriesCopy);
  // }

  fetchCourses(activeContent) {
    if (activeContent === 'browse-courses') {
      if (this.isAuthenticated) {
        this.mergeFilteredAndUserCourses();
      }

      return this.filteredCourses;

    } else {
      return this.filteredUserCourses;
    }
  }

  fetchCoursesPage(activeContent, page, pageSize) {
    if (activeContent === 'browse-courses') {
      return this.filteredCourses.value.slice((page - 1) * pageSize, page * pageSize);
    } else {
      return this.filteredUserCourses.value.slice((page - 1) * pageSize, page * pageSize);
    }
  }

  mergeFilteredAndUserCourses() {
    const modifiedFilteredCourses = this.filteredCourses.value;
    modifiedFilteredCourses.map(
      element => {
        if (this.userCourses.value.indexOf(element) !== -1) {
          element.userCourse = true;
        } else {
          element.userCourse = false;
        }
      }
    );

    this.filteredCourses.next([...modifiedFilteredCourses]);
  }

  addUserCourse(id) {
    const modifiedUserCourses = this.userCourses.value;
    const addedCourse = this.courses.find(element => element.id === id);

    modifiedUserCourses.push(addedCourse);
    modifiedUserCourses.sort((a, b) => (a.id - b.id));

    this.userCourses.next([...modifiedUserCourses]);
  }

  removeUserCourse(id) {
    // original array
    const modifiedUserCourses = this.userCourses.value;
    let removedCourse = modifiedUserCourses.find(element => element.id === id);

    modifiedUserCourses.splice(modifiedUserCourses.indexOf(removedCourse), 1);

    this.userCourses.next([...modifiedUserCourses]);

    // filtered courses
    const modifiedFilteredUserCourses = this.filteredUserCourses.value;
    removedCourse = modifiedFilteredUserCourses.find(element => element.id === id);

    modifiedFilteredUserCourses.splice(modifiedFilteredUserCourses.indexOf(removedCourse), 1);

    this.filteredUserCourses.next([...modifiedFilteredUserCourses]);
  }

  getCategoryById(id) {
    return this.categories.value.find(element => element.id === id).name;
  }

  getCategoryColorById(id) {
    return this.palette[id];
  }

  getNextCategoryColor() {
    return this.palette[this.getNextCategoryColorId()];
  }

  getNextCategoryColorId() {
    const currentCategories = this.categories.value;
    const lastColorId = currentCategories[currentCategories.length - 1].colorId;
    return lastColorId === this.palette.length - 1 ? 0 : lastColorId + 1;
  }
}
