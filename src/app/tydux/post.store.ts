import {Post} from '../common/blog/post/post.model';
import {Mutators, Store} from '@w11k/tydux';
import {initialState, State} from '../common/blog/post/post.reducer';
import {arrayToDictionary} from './utils';
import {Injectable} from '@angular/core';


export class PostMutators extends Mutators<State> {

  loadPosts(posts: Post[]) {
    this.state.entities = arrayToDictionary(posts, 'id');
    this.state.ids = posts.map(post => post.id);
  }

}

@Injectable()
export class PostStore extends Store<PostMutators, State> {

  constructor() {
    super('post', new PostMutators(), initialState);
  }

  loadPosts(posts: Post[]) {
    this.mutate.loadPosts(posts);
  }

}
