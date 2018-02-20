import {TComment} from '../common/blog/comment/comment.model';
import {Injectable} from '@angular/core';
import {EntityStore} from '../entity.store';

@Injectable()
export class CommentsStore extends EntityStore<TComment> {

  constructor() {
    super('comments');
  }

}
