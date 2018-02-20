import * as _ from 'lodash';
import {Mutators, Store} from '@w11k/tydux';
import {Dictionary} from '@ngrx/entity/src/models';

export interface EntityState<T> {
  ids: string[] | number[];
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

}
