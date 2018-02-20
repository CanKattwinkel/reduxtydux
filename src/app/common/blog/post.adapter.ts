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
  = (originalData: PostWithComments[]) => {
  const normalized = normalize(originalData, posts).entities;
  return {
    comments: dictToList(normalized.comments),
    posts: dictToList(normalized.posts),
  };
};


function dictToList<T>(dict: { [id: number]: T } | undefined): T[] {
  return Object.keys(dict || [])
  // TypeScript Compiler erkennt nicht, dass nicht iteriert wird - daher überlisten. :)
    .map(key => (dict as { [id: number]: T })[key]);
}
