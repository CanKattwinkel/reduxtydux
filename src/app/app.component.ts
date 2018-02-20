import {Component, OnDestroy, OnInit} from '@angular/core';
import {BlogService} from './common/blog/blog.service';
import {Observable} from 'rxjs/Observable';
import {FormControl, FormGroup} from '@angular/forms';
import {SearchForm} from './search-form.model';
import {Post, PostWithComments} from './common/blog/post/post.model';
import {Store} from '@ngrx/store';
import {getCombinedPosts, getPostSearchForm, getPostSearchIsFetching, RootState} from './app.store';
import {startWith, takeUntil} from 'rxjs/operators';
import {componentDestroyed} from 'ng2-rx-componentdestroyed';
import {FormUpdate} from './post-search/post-search.actions';
import * as postSearchActions from './post-search/post-search.actions';

@Component({
  selector: 'rvt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean>;
  posts$: Observable<PostWithComments[] | Post[]>;
  searchForm: FormGroup;

  constructor(private readonly blogService: BlogService, private store: Store<RootState>) {
    this.initForm();

    this.posts$ = this.store.select(getCombinedPosts);
    this.loading$ = this.store.select(getPostSearchIsFetching);
    this.searchForm.valueChanges.pipe(
      takeUntil((componentDestroyed(this))),
      startWith(this.searchForm.value)
    ).subscribe(formUpdate => this.store.dispatch(new FormUpdate(formUpdate)));

    this.store.select(getPostSearchForm)
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe(storeUpdate => this.updateForm(storeUpdate));
  }


  initForm() {
    this.searchForm = new FormGroup/*<SearchForm>*/({
      str: new FormControl(),
      includeComments: new FormControl(),
    });

  }

  go() {
    this.store.dispatch(new postSearchActions.FetchPosts(this.searchForm.value));
  }

  ngOnInit() {
  }

  updateForm(patch: Partial<SearchForm>) {
    this.searchForm.patchValue(patch, {emitEvent: false, onlySelf: false});
  }

  ngOnDestroy(): void {
  }

}
