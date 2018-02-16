import {Mutators, Store} from '@w11k/tydux';
import {initialState, State} from '../common/blog/comment/comment.reducer';
import {TComment} from '../common/blog/comment/comment.model';
import {Injectable} from '@angular/core';
import * as _ from 'lodash';


export class CommentsMutators extends Mutators<State> {

  loadComments(comments: { [id: string]: TComment }) {
    this.state.entities = comments;
    this.state.ids = _.keys(comments);
  }

}

@Injectable()
export class CommentsStore extends Store<CommentsMutators, State> {

  constructor() {
    super('comments', new CommentsMutators(), initialState);
  }

  loadComments(comments: { [id: string]: TComment }) {
    this.mutate.loadComments(comments);
  }

}
