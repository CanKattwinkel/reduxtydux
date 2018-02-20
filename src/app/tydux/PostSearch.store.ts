import {Mutators, selectMany, Store} from '@w11k/tydux';
import {initialState, State} from '../post-search/post-search.reducer';
import {SearchForm} from '../search-form.model';
import {BlogService} from '../common/blog/blog.service';
import {normalizePosts} from '../common/blog/post.adapter';
import {debounceTime, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {PostStore} from './Post.store';
import {CommentStore} from './Comment.store';
import {Post} from '../common/blog/post/post.model';
import {matchPostsWithComments} from '../app.store';
import {TComment} from '../common/blog/comment/comment.model';


export class PostSearchMutators extends Mutators<State> {

  formUpdate(form: Partial<SearchForm>) {
    this.state = {
      ...this.state,
      ...form
    };
  }

  setFetchState(isFetching: boolean) {
    this.state.isFetching = isFetching;
  }

}

@Injectable()
export class PostSearchStore extends Store<PostSearchMutators, State> {

  constructor(private blogService: BlogService,
              private postStore: PostStore,
              private commentStore: CommentStore) {
    super('PostSearchStore', new PostSearchMutators(), initialState);

    this.fetchPosts();

    // suche ändert sich
    this.selectNonNil(state => state.str)
      .asObservable()
      .pipe(
        debounceTime(1000)
      )
      .subscribe(str => this.fetchPosts());


    // incl. comments ändert sich
    this.selectNonNil(state => [state.includeComments])
      .asObservable()
      .subscribe(() => this.fetchPosts());
  }

  selectPosts() {
    return selectMany(
      this.postStore.selectAll(),
      this.commentStore.select(state => state.entities),
      (posts: Post[], comments) => {
        return matchPostsWithComments(posts, comments, this.state.includeComments);
      }
    );
  }

  formUpdate(form: Partial<SearchForm>) {
    this.mutate.formUpdate(form);
  }

  fetchPosts() {
    this.mutate.setFetchState(true);

    this.blogService.fetchPosts(this.state.includeComments, this.state.str)
      .pipe(
        map(data => normalizePosts(data))
      )
      .subscribe((data) => {
        this.postStore.load(data.posts as any);
        this.commentStore.load(data.comments as any);

        this.mutate.setFetchState(false);
      });
  }


}

