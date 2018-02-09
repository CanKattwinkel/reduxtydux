import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {PostWithComments} from './post.model';

@Component({
  selector: 'rvt-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnInit {

  @Input() post: PostWithComments;

  constructor() { }

  ngOnInit() {
  }

}
