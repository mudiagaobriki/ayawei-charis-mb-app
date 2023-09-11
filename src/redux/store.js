import { configureStore, combineReducers } from "@reduxjs/toolkit";
import financesReducer from "./features/finances/financesSlice"
import authReducer from "./features/auth/authSlice"
import userReducer from "./features/user/userSlice"
import { persistReducer } from "redux-persist";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist/es/constants";
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'root',
    // version: 1,
    storage: AsyncStorage,
}

const rootReducer = combineReducers({
    finances: financesReducer,
    auth: authReducer,
    user: userReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
          serializableCheck: {
              ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
          }
      })
})
