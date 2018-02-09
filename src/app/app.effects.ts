import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import * as postSearchActions from './post-search/post-search.actions';
import {PostSearchActionTypes} from './post-search/post-search.actions';
import {debounceTime, map, mergeMap} from 'rxjs/operators';
import {BlogService} from './common/blog/blog.service';
import {LoadPosts} from './common/blog/post/post.actions';
import {normalizePosts} from './common/blog/post.adapter';
import {LoadComments} from './common/blog/comment/comment.actions';


@Injectable()
export class AppEffects {


  /**
   * Hooks itself to the FormUpdate Action and triggers a debounced fetch */
  @Effect()
  listen$ = this.actions$
    .ofType(PostSearchActionTypes.FormUpdate)
    .pipe(
      debounceTime(300),
      map((action: postSearchActions.FormUpdate) => new postSearchActions.FetchPosts(action.payload)),
    );

  @Effect()
  load$ = this.actions$
    .ofType(PostSearchActionTypes.FetchPosts)
    .pipe(
      mergeMap((updates: postSearchActions.FetchPosts) => this.blogService.fetchPosts(updates.payload.includeComments, updates.payload.str)),
      map(data => normalizePosts(data)),
      mergeMap(data => [
          new LoadPosts({posts: data.posts}),
          new postSearchActions.FetchPostsSuccess(),
          new LoadComments({comments: data.comments})
        ]
      ),
    );

  constructor(private actions$: Actions, private blogService: BlogService) {
  }
}
