import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromPost from './post/post.reducer';
import * as fromComment from './comment/comment.reducer';

export interface State {

  post: fromPost.State;
  comment: fromComment.State;
}

export const reducers: ActionReducerMap<State> = {

  post: fromPost.reducer,
  comment: fromComment.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
