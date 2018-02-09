import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Post} from '../post/post.model';

@Component({
  selector: 'rvt-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent implements OnInit {

  @Input() posts: Post[];

  constructor() { }

  ngOnInit() {
  }

}
