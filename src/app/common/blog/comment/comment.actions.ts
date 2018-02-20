import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { TComment } from './comment.model';

export enum CommentActionTypes {
  LoadComments = '[Comment] Load Comments',
  AddComment = '[Comment] Add Comment',
  UpsertComment = '[Comment] Upsert Comment',
  AddComments = '[Comment] Add Comments',
  UpsertComments = '[Comment] Upsert Comments',
  UpdateComment = '[Comment] Update Comment',
  UpdateComments = '[Comment] Update Comments',
  DeleteComment = '[Comment] Delete Comment',
  DeleteComments = '[Comment] Delete Comments',
  ClearComments = '[Comment] Clear Comments'
}

export class LoadComments implements Action {
  readonly type = CommentActionTypes.LoadComments;

  constructor(public payload: { comments: TComment[] }) {}
}

export class AddComment implements Action {
  readonly type = CommentActionTypes.AddComment;

  constructor(public payload: { comment: TComment }) {}
}

export class UpsertComment implements Action {
  readonly type = CommentActionTypes.UpsertComment;

  constructor(public payload: { comment: TComment }) {}
}

export class AddComments implements Action {
  readonly type = CommentActionTypes.AddComments;

  constructor(public payload: { comments: TComment[] }) {}
}

export class UpsertComments implements Action {
  readonly type = CommentActionTypes.UpsertComments;

  constructor(public payload: { comments: TComment[] }) {}
}

export class UpdateComment implements Action {
  readonly type = CommentActionTypes.UpdateComment;

  constructor(public payload: { comment: Update<TComment> }) {}
}

export class UpdateComments implements Action {
  readonly type = CommentActionTypes.UpdateComments;

  constructor(public payload: { comments: Update<TComment>[] }) {}
}

export class DeleteComment implements Action {
  readonly type = CommentActionTypes.DeleteComment;

  constructor(public payload: { id: string }) {}
}

export class DeleteComments implements Action {
  readonly type = CommentActionTypes.DeleteComments;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearComments implements Action {
  readonly type = CommentActionTypes.ClearComments;
}

export type CommentActions =
 LoadComments
 | AddComment
 | UpsertComment
 | AddComments
 | UpsertComments
 | UpdateComment
 | UpdateComments
 | DeleteComment
 | DeleteComments
 | ClearComments;
