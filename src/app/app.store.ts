import {ActionReducerMap, createSelector} from '@ngrx/store';
import * as fromPostSearch from './post-search/post-search.reducer';
import * as fromPost from './common/blog/post/post.reducer';
import * as fromComment from './common/blog/comment/comment.reducer';
import {Dictionary} from '@ngrx/entity/src/models';
import {TComment} from './common/blog/comment/comment.model';
import {Post} from './common/blog/post/post.model';

export interface RootState {
  postSearch: fromPostSearch.State;
  comment: fromComment.State;
  post: fromPost.State;
}

export const reducers: ActionReducerMap<RootState> = {
  postSearch: fromPostSearch.reducer,
  comment: fromComment.reducer,
  post: fromPost.reducer
};


export const getPostSearchStore = (state: RootState) => state.postSearch;
export const getPostStore = (state: RootState) => state.post;
export const getCommentStore = (state: RootState) => state.comment;

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


export const getPosts = createSelector(
  getPostStore,
  fromPost.selectAll,
);

export const getCommentsDictionary = createSelector(
  getCommentStore,
  fromComment.selectEntities,
);

export const getCombinedPosts = createSelector(
  getPosts,
  getCommentsDictionary,
  getIncludeComments,
  matchPostsWithComments
);


export function matchPostsWithComments(posts: Post[], commentDictionary: Dictionary<TComment>, includeComments: boolean) {
  return includeComments
    ? posts.map(post => ({...post, comments: post.comments ? post.comments.map(commendId => commentDictionary[commendId]) : []}))
    : posts;
}
