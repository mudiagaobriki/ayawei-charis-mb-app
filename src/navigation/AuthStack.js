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
import {useSelector} from "react-redux";
import AddCash from "../screens/AddCash";
import Transfer from "../screens/Transfer";
import SettlementAccount from "../screens/SettlementAccount";
import Welcome from "../screens/authentication/Welcome";
import Signup from "../screens/authentication/Signup";
import BVNDetails from "../screens/authentication/BVNDetails";
import AuthDetails from "../screens/authentication/AuthDetails";
import PhoneOTPConfirmation from "../screens/authentication/PhoneOTPConfirmation";
import EmailVerification from "../screens/authentication/EmailVerification";
import TakeASelfie from "../screens/authentication/TakeASelfie";
import SelfieTaken from "../screens/authentication/SelfieTaken";
import VerifyingDetails from "../screens/authentication/VerifyingDetails";
import ProfileCreated from "../screens/authentication/ProfileCreated";
import WelcomeToCharis from "../screens/authentication/WelcomeToCharis";
import Signin from "../screens/authentication/Signin";
import CreatePasscode from "../screens/authentication/CreatePasscode";
import PasscodeSet from "../screens/authentication/PasscodeSet";
import GetStarted from "../screens/welcomeScreens/GetStarted";
import Dashboard from "../screens/dashboard/Dashboard";
import PaymentDashboard from "../screens/dashboard/PaymentDashboard";
import Deposit from "../screens/deposit/Deposit";
import Airtime from "../screens/bills/Airtime";
import AirtimeDetails from "../screens/bills/AirtimeDetails";


const Stack = createNativeStackNavigator();

function AuthStack() {
    const { username, isLoggedIn, id, token } = useSelector(state => state.auth)

    const { splashShown, status } = useSelector(state => state.user)

    console.log({ username, isLoggedIn, id, token })
    console.log({splashShown})

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ !splashShown? NavigationNames.SignIn:
          NavigationNames.SignIn }>
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
        name={NavigationNames.Welcome}
        component={Welcome}
        options={{
            headerShown: true,
            headerTitle: '',
            headerTransparent: true,
            headerBackVisible: false,
        }} />
      <Stack.Screen
          name={NavigationNames.Signup}
          component={Signup}
          options={{
              headerShown: true,
              headerTitle: '',
              headerTransparent: true,
              headerBackVisible: false,
          }} />
      <Stack.Screen
          name={NavigationNames.BVNDetails}
          component={BVNDetails}
          options={{
              headerShown: true,
              headerTitle: '',
              headerTransparent: true,
              headerBackVisible: false,
          }} />
      <Stack.Screen
          name={NavigationNames.AuthDetails}
          component={AuthDetails}
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
        name={NavigationNames.EmailOTPConfirmation}
        component={EmailOTPConfirmation}
        options={{
            headerShown: true,
            headerTitle: '',
            headerTransparent: true,
            headerBackVisible: false,
        }} />
      <Stack.Screen
          name={NavigationNames.PhoneOTPConfirmation}
          component={PhoneOTPConfirmation}
          options={{
              headerShown: true,
              headerTitle: '',
              headerTransparent: true,
              headerBackVisible: false,
          }} />
      <Stack.Screen
          name={NavigationNames.EmailVerification}
          component={EmailVerification}
          options={{
              headerShown: true,
              headerTitle: '',
              headerTransparent: true,
              headerBackVisible: false,
          }} />
      <Stack.Screen
          name={NavigationNames.Dashboard}
          component={Dashboard}
          options={{
              headerShown: true,
              headerTitle: '',
              headerTransparent: true,
              headerBackVisible: false,
          }} />
      <Stack.Screen
          name={NavigationNames.PaymentDashboard}
          component={PaymentDashboard}
          options={{
              headerShown: true,
              headerTitle: '',
              headerTransparent: true,
              headerBackVisible: false,
          }} />
      <Stack.Screen
          name={NavigationNames.Deposit}
          component={Deposit}
          options={{
              headerShown: true,
              headerTitle: '',
              headerTransparent: true,
              headerBackVisible: false,
          }} />
      <Stack.Screen
          name={NavigationNames.TakeASelfie}
          component={TakeASelfie}
          options={{
              headerShown: true,
              headerTitle: '',
              headerTransparent: true,
              headerBackVisible: false,
          }} />
      <Stack.Screen
          name={NavigationNames.SelfieTaken}
          component={SelfieTaken}
          options={{
              headerShown: true,
              headerTitle: '',
              headerTransparent: true,
              headerBackVisible: false,
          }} />
      <Stack.Screen
          name={NavigationNames.VerifyingDetails}
          component={VerifyingDetails}
          options={{
              headerShown: true,
              headerTitle: '',
              headerTransparent: true,
              headerBackVisible: false,
          }} />
      <Stack.Screen
          name={NavigationNames.ProfileCreated}
          component={ProfileCreated}
          options={{
              headerShown: true,
              headerTitle: '',
              headerTransparent: true,
              headerBackVisible: false,
          }} />
      <Stack.Screen
          name={NavigationNames.WelcomeToCharis}
          component={WelcomeToCharis}
          options={{
              headerShown: true,
              headerTitle: '',
              headerTransparent: true,
              headerBackVisible: false,
          }} />
      <Stack.Screen
          name={NavigationNames.SignIn}
          component={Signin}
          options={{
              headerShown: true,
              headerTitle: '',
              headerTransparent: true,
              headerBackVisible: false,
          }} />
      <Stack.Screen
          name={NavigationNames.CreatePasscode}
          component={CreatePasscode}
          options={{
              headerShown: true,
              headerTitle: '',
              headerTransparent: true,
              headerBackVisible: false,
          }} />
      <Stack.Screen
          name={NavigationNames.PasscodeSet}
          component={PasscodeSet}
          options={{
              headerShown: true,
              headerTitle: '',
              headerTransparent: true,
              headerBackVisible: false,
          }} />
      <Stack.Screen
          name={NavigationNames.GetStarted}
          component={GetStarted}
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
                  headerShown: false,
                  headerTitle: '',
                  headerTransparent: true,
                  headerBackVisible: true,
              }} />
          <Stack.Screen
              name={NavigationNames.Airtime}
              component={Airtime}
              options={{
                  headerShown: false,
                  headerTitle: '',
                  headerTransparent: true,
                  headerBackVisible: true,
              }} />
          <Stack.Screen
              name={NavigationNames.AirtimeDetails}
              component={AirtimeDetails}
              options={{
                  headerShown: false,
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
