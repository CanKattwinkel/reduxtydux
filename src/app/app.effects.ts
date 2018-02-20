import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import * as postSearchActions from './post-search/post-search.actions';
import {FormUpdate, PostSearchActionTypes} from './post-search/post-search.actions';
import {BlogService} from './common/blog/blog.service';
import {debounceTime, map, mergeMap} from 'rxjs/operators';
import {LoadPosts} from './common/blog/post/post.actions';
import {LoadComments} from './common/blog/comment/comment.actions';
import {normalizePosts} from './common/blog/post.adapter';

@Injectable()
export class AppEffects {


  @Effect() listen$ = this.actions$
    .ofType(PostSearchActionTypes.FormUpdateAction)
    .pipe(
      debounceTime((300)),
      map((action: FormUpdate) => new postSearchActions.FetchPosts(action.payload))
    );


  @Effect() load$ = this.actions$
    .ofType(PostSearchActionTypes.FetchPostsAction)
    .pipe(
      mergeMap((action: postSearchActions.FetchPosts) => this.blogService.fetchPosts(action.payload.includeComments, action.payload.str)),
      map(it => normalizePosts(it)),
      mergeMap(data => [
          new LoadPosts({posts: data.posts}),
          new postSearchActions.FetchPostsSuccess(),
          new LoadComments({comments: data.comments})
        ]
      )
    );

  constructor(private actions$: Actions, private blogService: BlogService) {

  }
}
