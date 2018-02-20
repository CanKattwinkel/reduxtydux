import {Mutators, selectMany, Store, UnboundedObservable} from '@w11k/tydux';
import {Injectable} from '@angular/core';
import {SearchForm} from '../search-form.model';
import {initialState, State} from '../post-search/post-search.reducer';
import {normalizePosts} from '../common/blog/post.adapter';
import {debounceTime, distinctUntilChanged, map, skip} from 'rxjs/operators';
import {CommentsStore} from './comments.store';
import {PostStore} from './post.store';
import {BlogService} from '../common/blog/blog.service';
import {matchPostsWithComments} from '../app.store';
import {Post, PostWithComments} from '../common/blog/post/post.model';


export class PostSearchMutators extends Mutators<State> {

  formUpdate(payload: Partial<SearchForm>) {
    this.state = {
      ...this.state,
      ...payload
    };
  }

  setFetchState(isFetching: boolean) {
    this.state.isFetching = isFetching;
  }

}

@Injectable()
export class PostSearchStore extends Store<PostSearchMutators, State> {

  constructor(readonly blogService: BlogService,
              readonly postStore: PostStore,
              readonly commentsStore: CommentsStore) {

    super('postSearch', new PostSearchMutators(), initialState);

    // initial loading
    this.fetchPosts();

    // search change
    this.selectNonNil(s => s.str)
      .pipe(
        skip(1),
        debounceTime(500),
        distinctUntilChanged()
      ).asObservable()
      .subscribe(() => this.fetchPosts());

    // includeComments changed
    this.selectNonNil(s => s.includeComments).pipe(
      skip(1)
    ).asObservable()
      .subscribe(() => this.fetchPosts());
  }

  formUpdate(payload: Partial<SearchForm>) {
    this.mutate.formUpdate(payload);
  }

  selectPosts(): UnboundedObservable<Post[] | PostWithComments[]> {
    return selectMany(
      this.postStore.selectAll(),
      this.commentsStore.select(state => state.entities),
      (posts: Post[], comments) => {
        return matchPostsWithComments(posts, comments, this.state.includeComments);
      }
    );
  }

  async fetchPosts() {
    this.mutate.setFetchState(true);

    await this.blogService.fetchPosts(this.state.includeComments, this.state.str)
      .pipe(
        map(data => normalizePosts(data)),
      )
      .subscribe((data) => {
        this.postStore.load(data.posts as any);
        this.commentsStore.load(data.comments as any);
        this.mutate.setFetchState(false);
      });
  }

}
