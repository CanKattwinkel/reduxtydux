import {EntityStore} from '../entity.store';
import {Post} from '../common/blog/post/post.model';
import {TComment} from '../common/blog/comment/comment.model';


export class CommentStore extends EntityStore<TComment> {
  constructor() {
    super('CommentStore');
  }
}

