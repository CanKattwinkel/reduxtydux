import {normalize, schema} from 'normalizr';
import {Post, PostWithComments} from './post/post.model';
import {TComment} from './comment/comment.model';

// See https://github.com/paularmstrong/normalizr
const comment = new schema.Entity('comments', {});

const post = new schema.Entity('posts', {
  comments: [comment]
});

const posts = new schema.Array(post);

/**
 * Trennt die Kommentare von den Posts ab und ersetzt diese durch ID's */
export const normalizePosts: (originalData: PostWithComments[]) => { comments: TComment[], posts: Post[] }
  = (originalData: PostWithComments[]) => normalize(originalData, posts).entities;
