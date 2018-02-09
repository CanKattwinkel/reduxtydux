import {Action} from '@ngrx/store';
import {SearchForm} from '../search-form.model';

export enum PostSearchActionTypes {
  FormUpdate = '[PostSearch] Form Update Action',
  FetchPosts = '[PostSearch] FetchPosts',
  FetchPostsSuccess = '[PostSearch] FetchPostsSuccess',
}

export class FormUpdate implements Action {
  readonly type = PostSearchActionTypes.FormUpdate;

  constructor(public readonly payload: Partial<SearchForm>) {
  }
}


export class FetchPosts implements Action {
  readonly type = PostSearchActionTypes.FetchPosts;

  constructor(public readonly payload: Partial<SearchForm>) {
  }
}

export class FetchPostsSuccess implements Action {
  readonly type = PostSearchActionTypes.FetchPostsSuccess;

  constructor() {
  }
}


export type PostSearchActions = FormUpdate | FetchPosts | FetchPostsSuccess;
