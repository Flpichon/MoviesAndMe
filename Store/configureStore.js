// Store/configureStore.js

import { createStore } from 'redux';
import toggleFavorite from './Reducers/favoriteReducer'
import toggleSeen from './Reducers/seenReducer'
import setAvatar from './Reducers/avatarReducer'
import toggleRated from './Reducers/rateReducer';
import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootPersistConfig = {
  key: 'root',
  storage
}

export default createStore(persistCombineReducers(rootPersistConfig, {toggleFavorite, setAvatar, toggleSeen, toggleRated}))
