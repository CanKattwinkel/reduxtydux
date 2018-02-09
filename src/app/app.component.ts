import {Component, OnInit} from '@angular/core';
import {BlogService} from './common/blog/blog.service';
import {Observable} from 'rxjs/Observable';
import {FormControl, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {getCombinedPosts, getPostSearchForm, getPostSearchIsFetching, RootState} from './app.store';
import {SearchForm} from './search-form.model';
import * as postSearchActions from './post-search/post-search.actions';
import {FormUpdate} from './post-search/post-search.actions';
import {PostWithComments, Post} from './common/blog/post/post.model';
import {startWith} from 'rxjs/operators';

@Component({
  selector: 'rvt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // todo takeuntil
  loading$: Observable<boolean>;
  posts$: Observable<PostWithComments[] | Post[]>;
  searchForm: FormGroup;

  constructor(private readonly blogService: BlogService, private store: Store<RootState>) {
    this.initForm();

    this.loading$ = this.store.select(getPostSearchIsFetching);
    this.posts$ = this.store.select(getCombinedPosts);
  }


  initForm() {
    this.searchForm = new FormGroup/*<SearchForm>*/({
      str: new FormControl(),
      includeComments: new FormControl(),
    });

    this.searchForm.valueChanges
      .pipe(
        startWith(this.searchForm.value)
      )
      .subscribe((updates: SearchForm) => this.store.dispatch(new FormUpdate(updates)));
  }

  ngOnInit() {
    this.store.select(getPostSearchForm).subscribe(updates => this.updateForm(updates));
  }

  updateForm(patch: Partial<SearchForm>) {
    this.searchForm.patchValue(patch, {emitEvent: false, onlySelf: false});
  }

  go() {
    this.store.dispatch(new postSearchActions.FetchPosts(this.searchForm.value));
  }

}
