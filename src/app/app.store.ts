import {ActionReducerMap, createSelector, MetaReducer} from '@ngrx/store';
import {environment} from '../environments/environment';
import * as fromPostSearch from './post-search/post-search.reducer';

export interface RootState {

  postSearch: fromPostSearch.State;
}

export const reducers: ActionReducerMap<RootState> = {

  postSearch: fromPostSearch.reducer,
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
