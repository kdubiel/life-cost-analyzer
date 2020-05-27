import { createStore, applyMiddleware, Middleware, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from 'store/rootReducer';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { AppStore } from 'interfaces';
import { createLogger } from 'redux-logger';

export const history = createBrowserHistory();

function configureStore() {
  const middlewares: Middleware[] = [
    thunkMiddleware,
    routerMiddleware(history),
    createLogger(),
  ];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store: Store<AppStore> = createStore(
    rootReducer(history),
    composeWithDevTools(middleWareEnhancer)
  );

  return store;
}

export default configureStore();
