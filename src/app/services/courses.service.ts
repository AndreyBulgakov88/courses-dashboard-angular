import { Injectable } from '@angular/core';
import { TagContentType } from '@angular/compiler';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private palette = ['#001f3f', '#39CCCC', '#01FF70', '#FF4136',
             '#B10DC9', '#DDDDDD', '#7FDBFF', '#2ECC40',
             '#FF851B', '#F012BE', '#AAAAAA', '#0074D9',
             '#3D9970', '#FFDC00', '#85144b', '#111111'];

  private tags = new BehaviorSubject([
    {id: 0, name: 'UI/UX', colorId: 0},
    {id: 1, name: 'Industrial Design', colorId: 1},
    {id: 2, name: 'Architecture', colorId: 2}
  ]);

  constructor() { }

  addTag(name, colorId) {
    const newTag = { id: this.tags.value.length, name, colorId};
    this.tags.next([...this.tags.value, newTag]);
  }

  fetchTags() {
    return this.tags;
  }

  getTagColorById(id) {
    return this.palette[id];
  }

  getNextTagColor() {
    return this.palette[this.getNextTagColorId()];
  }

  getNextTagColorId() {
    const currentTags = this.tags.value;
    const lastColorId = currentTags[currentTags.length - 1].colorId;
    return lastColorId === this.palette.length - 1 ? 0 : lastColorId + 1;
  }
}
