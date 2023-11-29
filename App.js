import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from "./src/screens/Home";
import BottomNavigation from "./src/navigation/BottomNavigation";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Splash from "./src/screens/intro/splash";
import AuthStack from "./src/navigation/AuthStack";
import {PaperProvider} from "react-native-paper";

export default function App() {

  let persistor = persistStore(store);

  return (
    <>
      <Provider store={store}>
      <PersistGate persistor={persistor} >
          <PaperProvider>
        {/*<BottomNavigation />*/}
          <AuthStack />
        <StatusBar style="auto" />
          </PaperProvider>
      </PersistGate>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
