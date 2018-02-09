import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {TComment} from './comment.model';

@Component({
  selector: 'rvt-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent implements OnInit {

  @Input() comment: TComment;
  constructor() { }

  ngOnInit() {
  }

}
