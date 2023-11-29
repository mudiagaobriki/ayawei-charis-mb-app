// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigationNames from './NavigationNames';
import Splash from '../screens/intro/splash';
import PhoneSignup from '../screens/authentication/PhoneSignup';
import EmailOTPConfirmation from "../screens/authentication/EmailOTPConfirmation";
import CreatePin from "../screens/authentication/CreatePin";
import Home from "../screens/Home";
import BasicDetails from "../screens/profile/BasicDetails";
import Address from "../screens/profile/Address";
import Identification from "../screens/profile/Identification";


const Stack = createNativeStackNavigator();

function MainStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={NavigationNames.Splash}>
        <Stack.Screen
        name={NavigationNames.Splash}
        component={Splash}
        options={{
            headerShown: true,
            headerTitle: '',
            headerTransparent: true,
            headerBackVisible: false,
        }} />
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
        component={EmailOTPConfirmation}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStack;
