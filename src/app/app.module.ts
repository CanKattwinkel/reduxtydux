import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {BlogModule} from './common/blog/blog.module';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {AppEffects} from './app.effects';
import {ReactiveFormsModule} from '@angular/forms';
import {reducers} from './app.store';
import {PostSearchStore} from './tydux/post-search.store';
import {PostStore} from './tydux/post.store';
import {CommentsStore} from './tydux/comments.store';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // StoreModule.forRoot(reducers),
    // !environment.production ? StoreDevtoolsModule.instrument() : [],
    // EffectsModule.forRoot([AppEffects]),
    BlogModule,
    ReactiveFormsModule,
  ],
  providers: [
    PostSearchStore,
    PostStore,
    CommentsStore
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
