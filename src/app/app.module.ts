import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {BlogModule} from './common/blog/blog.module';
import {ReactiveFormsModule} from '@angular/forms';
import {PostSearchStore} from './tydux/PostSearch.store';
import {PostStore} from './tydux/Post.store';
import {CommentStore} from './tydux/Comment.store';


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
    CommentStore
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
