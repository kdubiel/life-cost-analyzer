import { combineReducers, Reducer, ReducersMapObject } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { AppStore } from 'interfaces';
import { entriesReducer, entryListReducer } from './entries/entriesReducer';
import { statisticsReducer } from './statistics/statisticsReducer';

const rootReducer = (history: History): Reducer<AppStore> => {
  const entities: ReducersMapObject = {
    entry: entriesReducer,
  };

  const ui: ReducersMapObject = {
    entryList: entryListReducer,
  };

  const reducersMap: ReducersMapObject<AppStore> = {
    router: connectRouter(history) as Reducer,
    entities: combineReducers(entities),
    statistics: statisticsReducer,
    ui: combineReducers(ui),
  };

  return combineReducers(reducersMap);
};

export default rootReducer;
