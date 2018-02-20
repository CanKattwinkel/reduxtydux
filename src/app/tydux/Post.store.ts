import {EntityStore} from '../entity.store';
import {Post} from '../common/blog/post/post.model';



export class PostStore extends EntityStore<Post> {
  constructor() {
    super('PostStore');
  }
}

