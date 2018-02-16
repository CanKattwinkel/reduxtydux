import {Post} from '../common/blog/post/post.model';
import {Mutators, Store} from '@w11k/tydux';
import {initialState, State} from '../common/blog/post/post.reducer';
import {Injectable} from '@angular/core';
import * as _ from 'lodash';


export class PostMutators extends Mutators<State> {

  loadPosts(posts: { [id: string]: Post }) {
    this.state.entities = posts;
    this.state.ids = _.keys(posts);
  }

}

@Injectable()
export class PostStore extends Store<PostMutators, State> {

  constructor() {
    super('post', new PostMutators(), initialState);
  }

  loadPosts(posts: { [id: string]: Post }) {
    this.mutate.loadPosts(posts);
  }

}
