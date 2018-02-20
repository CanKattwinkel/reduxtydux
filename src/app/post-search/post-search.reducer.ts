import {createSelector} from '@ngrx/store';
import {PostSearchActions, PostSearchActionTypes} from './post-search.actions';


export interface State {
  str: string;
  isFetching: boolean;
  includeComments: boolean;
}

export const initialState: State = {
  str: '',
  isFetching: false,
  includeComments: false,
};

export function reducer(state = initialState, action: PostSearchActions): State {
  switch (action.type) {

    case PostSearchActionTypes.FormUpdateAction:
      return {...state, ...action.payload};


    case PostSearchActionTypes.FetchPostsAction:
      return {...state, isFetching: true};

    case PostSearchActionTypes.FetchPostsSuccessAction:
      return {...state, isFetching: false};

    default:
      return state;
  }
}


export const getSearchStr = (state: State) => state.str;
export const getIsFetching = (state: State) => state.isFetching;
export const getIncludeComments = (state: State) => state.includeComments;


export const getSearchForm = createSelector(getSearchStr, getIncludeComments, (str: string, includeComments: boolean) => ({
  str,
  includeComments
}));
