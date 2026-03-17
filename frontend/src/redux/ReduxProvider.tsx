// src/redux/ReduxProvider.tsx
"use client";

import { Provider as ReactReduxProvider } from "react-redux";
import { store } from "./store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

let persistor = persistStore(store);

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </ReactReduxProvider>
  );
}