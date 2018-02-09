import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommentComponent} from './comment/comment.component';
import {PostComponent} from './post/post.component';
import {BlogService} from './blog.service';
import {HttpClientModule} from '@angular/common/http';
import { PostListComponent } from './post-list/post-list.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  declarations: [
    CommentComponent,
    PostComponent,
    PostListComponent
  ],
  exports: [
    PostListComponent,
  ],
  providers: [
    BlogService
  ]
})
export class BlogModule {
}
