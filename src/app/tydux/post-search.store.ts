import {SearchForm} from '../search-form.model';
import {BlogService} from '../common/blog/blog.service';
import {Mutators, Store} from '@w11k/tydux';
import {initialState, State} from '../post-search/post-search.reducer';
import {PostStore} from './post.store';
import {normalizePosts} from '../common/blog/post.adapter';
import {map} from 'rxjs/operators';
import {CommentsStore} from './comments.store';
import {Injectable} from '@angular/core';
import {UnboundedObservable} from '@w11k/tydux/dist/UnboundedObservable';


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
  }

  formUpdate(payload: Partial<SearchForm>) {
    this.mutate.formUpdate(payload);
    this.fetchPosts();
  }

  selectPosts() {
    return new UnboundedObservable(
      this.postStore.select(state => {
        return state.ids;
      }).unbounded()
        .pipe(
          map(() => {
            const state = this.postStore.state;
            return (state.ids as string[]).map(id => state.entities[id]);
          })
        )
    );
  }

  private async fetchPosts() {
    this.mutate.setFetchState(true);

    await this.blogService.fetchPosts(this.state.includeComments, this.state.str)
      .pipe(
        map(data => normalizePosts(data)),
      )
      .subscribe((data) => {
        this.postStore.loadPosts(data.posts);
        this.commentsStore.loadComments(data.comments);

        this.mutate.setFetchState(false);
      });

  }

}
