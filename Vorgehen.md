
1.
yarn add @ngrx/schematics --dev

2. .angular-cli.json

```
    "schematics": {
      "collection": "@ngrx/schematics"
    }
```


3. Dependency
yarn add @ngrx/{store,effects,store-devtools,entity}   ngrx-store-freeze















4. Initial State Setup
ng generate store State --root --module app.module.ts --collection @ngrx/schematics
Umbennenen in app.store, verschieben nach /app
State Umbenennen in RootState




















5. Search Reducer

Boilerplate:
ng generate reducer post-search --flat false -r app.store.ts
ng generate action post-search --flat false

State & Initial State anlegen im Reducer:
export interface State {
  str: string;
  isFetching: boolean;
  includeComments: boolean;
}


Actions: 
FormUpdate(payload: Partial<SearchForm>), 
FetchPosts(payload: Partial<SearchForm>), 
FetchPostsSuccess(),


Select Functions:
Simple: getSearchStr getIsFetching getIncludeComments
Kombiniert aus Str und Include Commetns : getSearchForm

Reducer implementieren für jeden PostSearchActionTypes.
Davor Typiseriung aktivieren: Actions durch PostSearchActions ersetzen




Selektoren für den Teilausschnitt des Stores im AppStore:
export const getPostSearchStore = (state: RootState) => state.postSearch;
export const getPostSearchForm = createSelector(
  getPostSearchStore,
  fromPostSearch.getSearchForm
);
export const getPostSearchIsFetching = createSelector(
  getPostSearchStore,
  fromPostSearch.getIsFetching
);
export const getIncludeComments = createSelector(
  getPostSearchStore,
  fromPostSearch.getIncludeComments
);



Verbinden mit dem Formular im AppCompoennt: 
A) loading$
B) searchForm.valueChanges -> Dispatch -> new FormUpdate(updates) (startWith(this.searchForm.value)
C) this.store.select(getPostSearchForm) -> updateForm


















6. Feature Module Blog

Blog Reducer Anlegen:
ng generate store Blog  --statePath common/blog  --module common/blog/blog.module.ts

Entity Post anlegen
ng generate entity Post --reducers common/blog/index.ts

Entity Comment anlegen
ng generate entity Comment --reducers common/blog/index.ts

Comment und Blog jeweils in die Componenten Ordner verschieben. Modelle angleichen.













8. Kontrollfluss.

UpsertPost, UpsertPosts & Comments -> löschen.

Effect generieren lassen:
ng generate effect App --root --module app.module.ts

named import: 
import * as postSearchActions from './post-search/post-search.actions';

listen$ -> ofType(PostSearchActionTypes.FormUpdateAction): postSearchActions.FetchPosts(action.payload)
load$   -> ofType(PostSearchActionTypes.FetchPostsAction): [LoadPosts, postSearchActions.FetchPostsSuccess(), LoadComments]
normalizePosts dann mergeMap[...]

import * as postSearchActions from './post-search/post-search.actions';
AppComponent#go -> postSearchActions.FetchPosts
Sicherstellen, das Blogmodul nach dem StoreDevtools Modul eingebunden wird.

app.store -> RootState usw updaten







9. Select Posts / Comments










10. Endlich! 

getCombinedPosts im AppComponent
