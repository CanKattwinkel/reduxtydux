import {SearchForm} from '../search-form.model';
import {BlogService} from '../common/blog/blog.service';
import {Mutators, Store} from '@w11k/tydux';
import {initialState, State} from '../post-search/post-search.reducer';
import {PostStore} from './post.store';
import {normalizePosts} from '../common/blog/post.adapter';
import {map} from 'rxjs/operators';
import {CommentsStore} from './comments.store';
import {Injectable} from '@angular/core';


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

  constructor(private blogService: BlogService,
              private postStore: PostStore,
              private commentsStore: CommentsStore) {

    super('postSearch', new PostSearchMutators(), initialState);
  }

  formUpdate(payload: Partial<SearchForm>) {
    this.mutate.formUpdate(payload);
    this.fetchPosts();
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
