import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Post } from './post.model';

export enum PostActionTypes {
  LoadPosts = '[Post] Load Posts',
  AddPost = '[Post] Add Post',
  AddPosts = '[Post] Add Posts',
  UpdatePost = '[Post] Update Post',
  UpdatePosts = '[Post] Update Posts',
  DeletePost = '[Post] Delete Post',
  DeletePosts = '[Post] Delete Posts',
  ClearPosts = '[Post] Clear Posts'
}

export class LoadPosts implements Action {
  readonly type = PostActionTypes.LoadPosts;

  constructor(public payload: { posts: Post[] }) {}
}

export class AddPost implements Action {
  readonly type = PostActionTypes.AddPost;

  constructor(public payload: { post: Post }) {}
}

export class AddPosts implements Action {
  readonly type = PostActionTypes.AddPosts;

  constructor(public payload: { posts: Post[] }) {}
}

export class UpdatePost implements Action {
  readonly type = PostActionTypes.UpdatePost;

  constructor(public payload: { post: Update<Post> }) {}
}

export class UpdatePosts implements Action {
  readonly type = PostActionTypes.UpdatePosts;

  constructor(public payload: { posts: Update<Post>[] }) {}
}

export class DeletePost implements Action {
  readonly type = PostActionTypes.DeletePost;

  constructor(public payload: { id: string }) {}
}

export class DeletePosts implements Action {
  readonly type = PostActionTypes.DeletePosts;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearPosts implements Action {
  readonly type = PostActionTypes.ClearPosts;
}

export type PostActions =
 LoadPosts
 | AddPost
 | AddPosts
 | UpdatePost
 | UpdatePosts
 | DeletePost
 | DeletePosts
 | ClearPosts;
