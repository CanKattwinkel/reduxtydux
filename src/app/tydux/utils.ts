import {Dictionary} from '@ngrx/entity/src/models';

export function arrayToDictionary<T, K extends keyof T>(values: T[], key: K): Dictionary<T> {
  const dict: Dictionary<T> = {};
  values.forEach(post => {
    const keyVal = post[key].toString();
    dict[keyVal] = post;
  });
  return dict;
}
