// src/redux/store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import bookSlice from "./features/bookSlice";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // ใช้ localStorage ของเว็บบราว์เซอร์

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  bookSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ป้องกัน Error จาก redux-persist
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;