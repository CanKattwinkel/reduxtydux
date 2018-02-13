import {Component, OnDestroy, OnInit} from '@angular/core';
import {BlogService} from './common/blog/blog.service';
import {Observable} from 'rxjs/Observable';
import {FormControl, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {getCombinedPosts, getPostSearchForm, getPostSearchIsFetching, RootState} from './app.store';
import {SearchForm} from './search-form.model';
import * as postSearchActions from './post-search/post-search.actions';
import {FormUpdate} from './post-search/post-search.actions';
import {Post, PostWithComments} from './common/blog/post/post.model';
import {map, startWith, takeUntil} from 'rxjs/operators';
import {componentDestroyed} from 'ng2-rx-componentdestroyed';
import {PostSearchStore} from './tydux/post-search.store';

@Component({
  selector: 'rvt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  loading$: Observable<boolean>;

  posts$: Observable<PostWithComments[] | Post[]>;

  searchForm: FormGroup;

  constructor(private readonly blogService: BlogService,
              private readonly postSearchStore: PostSearchStore) {
    this.initForm();

    // this.loading$ = this.store.select(getPostSearchIsFetching);
    this.loading$ = postSearchStore.select(s => s.isFetching).boundToComponent(this);

    // this.posts$ = this.store.select(getCombinedPosts);
    this.posts$ = this.postSearchStore.selectPosts().boundToComponent(this);
  }


  initForm() {
    this.searchForm = new FormGroup/*<SearchForm>*/({
      str: new FormControl(),
      includeComments: new FormControl(),
    });

    this.searchForm.valueChanges
      .pipe(
        takeUntil(componentDestroyed(this)),
        startWith(this.searchForm.value)
      )
      .subscribe((updates: SearchForm) => {
        // this.store.dispatch(new FormUpdate(updates));
        this.postSearchStore.formUpdate(updates);
      });
  }

  ngOnInit() {
    // this.store.select(getPostSearchForm)
    //   .pipe(takeUntil(componentDestroyed(this)))
    //   .subscribe(updates => {
    //     this.updateForm(updates);
    //   });
  }

  updateForm(patch: Partial<SearchForm>) {
    this.searchForm.patchValue(patch, {emitEvent: false, onlySelf: false});
  }

  go() {
    // this.store.dispatch(new postSearchActions.FetchPosts(this.searchForm.value));
  }

  ngOnDestroy(): void {
  }

}
