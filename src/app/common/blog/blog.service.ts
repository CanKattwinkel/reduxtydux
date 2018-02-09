import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {PostWithComments} from './post/post.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class BlogService {

  constructor(private readonly httpClient: HttpClient) {
  }


  fetchPosts(includeComments = true, query?: string): Observable<PostWithComments[]> {
    const url = `https://jsonplaceholder.typicode.com/posts`;
    let params = new HttpParams();

    if (includeComments) {
      params = params.append('_embed', 'comments');
    }
    if (query) {
      params = params.append('q', query);
    }

    return this.httpClient.get<PostWithComments[]>(url, {params});

  }

}
