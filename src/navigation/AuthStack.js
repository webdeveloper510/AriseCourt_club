import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import MainStack from './mainStack';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Login'>
      <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="MainStack" component={MainStack} />
      {/* <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotScreen} />
      <Stack.Screen name="OTPVerify" component={OTPVerifyScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} /> */}
    </Stack.Navigator>
  );
};

export default AuthStack;
