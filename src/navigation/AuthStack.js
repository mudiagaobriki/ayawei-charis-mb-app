// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigationNames from './NavigationNames';
import Splash from '../screens/intro/splash';
import PhoneSignup from '../screens/authentication/PhoneSignup';
import OTPConfirmation from "../screens/authentication/OTPConfirmation";
import CreatePin from "../screens/authentication/CreatePin";
import Home from "../screens/Home";
import BasicDetails from "../screens/profile/BasicDetails";
import Address from "../screens/profile/Address";
import Identification from "../screens/profile/Identification";
import {useSelector} from "react-redux";
import AddCash from "../screens/AddCash";
import Transfer from "../screens/Transfer";
import SettlementAccount from "../screens/SettlementAccount";


const Stack = createNativeStackNavigator();

function AuthStack() {
    const { username, isLoggedIn, id, token } = useSelector(state => state.auth)

    const { splashShown, status } = useSelector(state => state.user)

    console.log({ username, isLoggedIn, id, token })
    console.log({splashShown})

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ !splashShown? NavigationNames.Splash:
          NavigationNames.PhoneSignup }>
        <Stack.Screen
        name={NavigationNames.Splash}
        component={Splash}
        options={{
            headerShown: true,
            headerTitle: '',
            headerTransparent: true,
            headerBackVisible: false,
        }} />
        {/*<Stack.Screen */}
        {/*name={NavigationNames.PhoneSignup} */}
        {/*component={Login}*/}
        {/*options={{*/}
        {/*    headerShown: true,*/}
        {/*    headerTitle: '',*/}
        {/*    headerTransparent: true,*/}
        {/*    headerBackVisible: false,*/}
        {/*}} />*/}
        <Stack.Screen
        name={NavigationNames.PhoneSignup}
        component={PhoneSignup}
        options={{
            headerShown: true,
            headerTitle: '',
            headerTransparent: true,
            headerBackVisible: false,
        }} />
        <Stack.Screen
        name={NavigationNames.OTPConfirmation}
        component={OTPConfirmation}
        options={{
            headerShown: true,
            headerTitle: '',
            headerTransparent: true,
            headerBackVisible: false,
        }} />
      <Stack.Screen
          name={NavigationNames.CreatePin}
          component={CreatePin}
          options={{
              headerShown: true,
              headerTitle: '',
              headerTransparent: true,
              headerBackVisible: false,
          }} />
          <Stack.Screen
              name={NavigationNames.BasicDetails}
              component={BasicDetails}
              options={{
                  headerShown: true,
                  headerTitle: '',
                  headerTransparent: true,
                  headerBackVisible: false,
              }} />
          <Stack.Screen
              name={NavigationNames.Address}
              component={Address}
              options={{
                  headerShown: true,
                  headerTitle: '',
                  headerTransparent: true,
                  headerBackVisible: false,
              }} />
          <Stack.Screen
              name={NavigationNames.Identification}
              component={Identification}
              options={{
                  headerShown: true,
                  headerTitle: '',
                  headerTransparent: true,
                  headerBackVisible: false,
              }} />
          <Stack.Screen
              name={NavigationNames.Home}
              component={Home}
              options={{
                  headerShown: true,
                  headerTitle: '',
                  headerTransparent: true,
                  headerBackVisible: false,
              }} />
          <Stack.Screen
              name={NavigationNames.AddCash}
              component={AddCash}
              options={{
                  headerShown: true,
                  headerTitle: '',
                  headerTransparent: true,
                  headerBackVisible: true,
              }} />
          <Stack.Screen
              name={NavigationNames.Transfer}
              component={Transfer}
              options={{
                  headerShown: true,
                  headerTitle: '',
                  headerTransparent: true,
                  headerBackVisible: true,
              }} />
          <Stack.Screen
              name={NavigationNames.SettlementAccount}
              component={SettlementAccount}
              options={{
                  headerShown: true,
                  headerTitle: '',
                  headerTransparent: true,
                  headerBackVisible: true,
              }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthStack;
