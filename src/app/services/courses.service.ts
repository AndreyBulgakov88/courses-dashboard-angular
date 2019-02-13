import { Injectable, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
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

  private activeContent = new BehaviorSubject(null);

  headerFilter: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.filteredCourses.next(this.courses);
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
  }

  // toggleCategoryFavourite(category) {
  //   const categoryIndex = this.categories.value.indexOf(category);
  //   const categoriesCopy = this.categories.value.slice();

  //   categoriesCopy[categoryIndex]['fav'] = categoriesCopy[categoryIndex]['fav'] === null ? true : !categoriesCopy[categoryIndex]['fav'];
  //   this.categories.next(categoriesCopy);
  // }

  fetchCourses() {
    return this.filteredCourses;
  }

  fetchCoursesPage(page, pageSize) {
    return this.filteredCourses.value.slice((page - 1) * pageSize, page * pageSize);
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
