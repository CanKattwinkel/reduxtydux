import {ActionReducerMap, createSelector, MetaReducer} from '@ngrx/store';
import {environment} from '../environments/environment';
import * as fromPostSearch from './post-search/post-search.reducer';
import * as fromPost from './common/blog/post/post.reducer';
import * as fromComment from './common/blog/comment/comment.reducer';

export interface RootState {
  postSearch: fromPostSearch.State;
  comment: fromComment.State;
  post: fromPost.State;
}

export const reducers: ActionReducerMap<RootState> = {

  postSearch: fromPostSearch.reducer,
  comment: fromComment.reducer,
  post: fromPost.reducer,
};


export const metaReducers: MetaReducer<RootState>[] = !environment.production ? [] : [];


export const getPostSearchStore = (state: RootState) => state.postSearch;
export const getPostSearchForm = createSelector(
  getPostSearchStore,
  fromPostSearch.getSearchForm
);
export const getPostSearchIsFetching = createSelector(
  getPostSearchStore,
  fromPostSearch.getIsFetching
);
export const getIncludeComments = createSelector(
  getPostSearchStore,
  fromPostSearch.getIncludeComments
);
