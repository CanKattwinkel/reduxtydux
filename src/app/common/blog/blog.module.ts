import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommentComponent} from './comment/comment.component';
import {PostComponent} from './post/post.component';
import {BlogService} from './blog.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  declarations: [
    CommentComponent,
    PostComponent
  ],
  exports: [
    PostComponent
  ],
  providers: [
    BlogService
  ]
})
export class BlogModule {
}
