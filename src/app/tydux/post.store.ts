import {Post} from '../common/blog/post/post.model';
import {Injectable} from '@angular/core';
import {EntityStore} from '../entity.store';


@Injectable()
export class PostStore extends EntityStore<Post> {

  constructor() {
    super('post');
  }

}
