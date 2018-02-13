import {Mutators, Store} from '@w11k/tydux';
import {initialState, State} from '../common/blog/comment/comment.reducer';
import {arrayToDictionary} from './utils';
import {TComment} from '../common/blog/comment/comment.model';
import {Injectable} from '@angular/core';


export class CommentsMutators extends Mutators<State> {

  loadPosts(comments: TComment[]) {
    this.state.entities = arrayToDictionary(comments, 'id');
    this.state.ids = comments.map(post => post.id);
  }

}

@Injectable()
export class CommentsStore extends Store<CommentsMutators, State> {

  constructor() {
    super('comments', new CommentsMutators(), initialState);
  }

  loadComments(comments: TComment[]) {
    this.mutate.loadPosts(comments);
  }

}
