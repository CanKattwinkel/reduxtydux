import * as _ from 'lodash';
import {Mutators, Store} from '@w11k/tydux';
import {Dictionary} from '@ngrx/entity/src/models';
import {map} from 'rxjs/operators';

export interface EntityState<T> {
  ids: Array<string | number>;
  entities: Dictionary<T>;
}


export class EntityMutators<T> extends Mutators<EntityState<T>> {

  load(objs: { [id: string]: T }) {
    this.state.entities = objs;
    this.state.ids = _.keys(objs);
  }

}

export class EntityStore<T> extends Store<EntityMutators<T>, EntityState<T>> {

  constructor(storeId: string) {
    super(storeId, new EntityMutators(), {
      ids: [],
      entities: {}
    });
  }

  load(objs: { [id: string]: T }) {
    this.mutate.load(objs);
  }

  selectAll() {
    return this.select()
      .pipe(
        map(state => {
          return state.ids.map((id) => state.entities[id]);
        })
      );
  }

}
