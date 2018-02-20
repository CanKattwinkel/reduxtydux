import {Action} from '@ngrx/store';
import {SearchForm} from '../search-form.model';

export enum PostSearchActionTypes {
  FormUpdateAction = '[PostSearch] FormUpdate',
  FetchPostsAction = '[PostSearch] FetchPosts',
  FetchPostsSuccessAction = '[PostSearch] FetchPostsSuccess',
}


export class FormUpdate implements Action {
  readonly type = PostSearchActionTypes.FormUpdateAction;

  constructor(public readonly payload: Partial<SearchForm>) {

  }
}

export class FetchPosts implements Action {
  readonly type = PostSearchActionTypes.FetchPostsAction;

  constructor(public readonly payload: Partial<SearchForm>) {
  }
}

export class FetchPostsSuccess implements Action {
  readonly  type = PostSearchActionTypes.FetchPostsSuccessAction;
}


export type PostSearchActions = FormUpdate
  | FetchPosts
  | FetchPostsSuccess;
