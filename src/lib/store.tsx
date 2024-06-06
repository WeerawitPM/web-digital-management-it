import { combineReducers, configureStore } from '@reduxjs/toolkit';
import equipmentReducer from './equipmentSlice';
import repairReducer from './repairSlice';

const rootReducer = combineReducers({
  equipment: equipmentReducer,
  repair: repairReducer
});

const saveToLocalStorage = (store: any) => (next: any) => (action: any) => {
  const result = next(action);
  if (typeof localStorage !== 'undefined') {
    try {
      const serializedState = JSON.stringify(store.getState());
      localStorage.setItem('reduxState', serializedState);
    } catch (e) {
      console.log(e);
    }
  }
  return result;
};

const loadFromLocalStorage = () => {
  if (typeof localStorage !== 'undefined') {
    try {
      const serializedState = localStorage.getItem('reduxState');
      if (serializedState === null) return undefined;
      return JSON.parse(serializedState);
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }
  return undefined;
};

export default function initializeStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(saveToLocalStorage),
    preloadedState: loadFromLocalStorage()
  });
};
