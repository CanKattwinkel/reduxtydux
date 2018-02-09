import {TComment} from '../comment/comment.model';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  comments: number[];
}

export interface PostWithComments {
  userId: number;
  id: number;
  title: string;
  body: string;
  comments: TComment[];
}
