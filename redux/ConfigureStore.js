import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { products } from './products';
import { comments } from './comments';
import { leaders } from './leaders';
import { promotions } from './promotions';
import { favorites } from './favorites';
import { carts } from './carts';

// redux-persist
import { persistStore, persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
const config = { key: 'root', storage: AsyncStorage, debug: true };
export const ConfigureStore = () => {
  const store = createStore(
    persistCombineReducers(config, { leaders, products , comments, promotions, favorites, carts }),
    applyMiddleware(thunk, logger)
  );
  const persistor = persistStore(store);
  return { persistor, store };
};