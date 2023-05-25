import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import filterReducer from './filter/filterSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import dialogsReducer from './dialogs/dialogsSlice';

const rootReducer = combineReducers({
  user: userReducer,
  filter: filterReducer,
  dialogs: dialogsReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persReducer = persistReducer(persistConfig, rootReducer);
// Преобразование редьюсеров для их удобного хранения, принимает конфиг
// и редьюсеры

export const store = configureStore({
  reducer: persReducer,

  middleware: (getDefaultMiddleware) =>
  // Передаётся функция, она принимает другую функцию и возвращается вызов
  // с определённой информацией что делать
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
// В момент конфигурации store, передаём ему редьюсеры

export const persister = persistStore(store); // Обёртка над store

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
