import {Component, OnDestroy, OnInit} from '@angular/core';
import {BlogService} from './common/blog/blog.service';
import {Observable} from 'rxjs/Observable';
import {FormControl, FormGroup} from '@angular/forms';
import {SearchForm} from './search-form.model';
import {Post, PostWithComments} from './common/blog/post/post.model';

@Component({
  selector: 'rvt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean>;
  posts$: Observable<PostWithComments[] | Post[]>;
  searchForm: FormGroup;

  constructor(private readonly blogService: BlogService) {
    this.initForm();

  }


  initForm() {
    this.searchForm = new FormGroup/*<SearchForm>*/({
      str: new FormControl(),
      includeComments: new FormControl(),
    });

  }

  ngOnInit() {
  }

  updateForm(patch: Partial<SearchForm>) {
    this.searchForm.patchValue(patch, {emitEvent: false, onlySelf: false});
  }

  ngOnDestroy(): void {
  }

}
