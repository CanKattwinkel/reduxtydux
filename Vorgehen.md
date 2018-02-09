
1.
yarn add @ngrx/schematics --dev

2. .angular-cli.json

```
    "schematics": {
      "collection": "@ngrx/schematics"
    }
```


3. Dependency
yarn add @ngrx/{store,effects,store-devtools,entity}  

4. Initial State Setup
ng generate store State --root --module app.module.ts --collection @ngrx/schematics
Umbennenen in app.store, verschieben nach /app

5. Feature Module Blog

ng generate store Blog  --statePath common/blog  --module common/blog/blog.module.ts
ng generate entity Post --reducers common/blog/index.ts
ng generate entity Comment --reducers common/blog/index.ts

Dateien verschieben.. 


6. Search Reducer
ng generate reducer post-search --flat false -r app.store.ts
ng generate action post-search --flat false


7. Form

Form erstellen, Values in Form schreiben, Store bei Änderungen aktualisieren.


8. Kontrollfluss.
FormUpdate wird im Effect überwacht und löst ein Fetch aus. Dieses Fetch beginnt mit einer LadeAction und endet mit einer SuccessAction. Zusätzlich werden Actions geschmissen um normalisierte Daten in die Post/Comment Stores zu füllen.
