import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
  query
} from '@angular/animations';
import { CoursesService } from '@app/services/courses.service';

@Component({
  selector: 'app-navigation-panel',
  templateUrl: './navigation-panel.component.html',
  styleUrls: ['./navigation-panel.component.scss'],
  animations: [
    trigger('addTag', [
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

  addingTag = false;
  tags = [];
  palette = [];

  private addInputElRef: ElementRef;
  @ViewChild('addInput') set addInput(elRef: ElementRef) {
    this.addInputElRef = elRef;
  }

  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
  }

  toggleAddTag() {
    this.addingTag = !this.addingTag;

    if (this.addingTag) {
      setTimeout(() => { this.addInputElRef.nativeElement.focus(); });
    }
  }

  onAddTag(e, colorId) {
    if (e.keyCode === 13) {
      this.coursesService.addTag(e.target.value, colorId);
      this.addingTag = false;
    } else if (e.keyCode === 27) {
      this.addingTag = false;
    }
  }
}
