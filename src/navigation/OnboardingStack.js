import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Onboarding1 from '../screens/Onboarding1';
import Onboarding2 from '../screens/Onboarding2';
import Onboarding3 from '../screens/Onboarding3';
import Onboarding4 from '../screens/Onboarding4';
import AuthStack from './AuthStack';
import MainStack from './mainStack';
const Stack = createNativeStackNavigator();

const OnboardingStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding1" component={Onboarding1} />
      <Stack.Screen name="Onboarding2" component={Onboarding2} />
      <Stack.Screen name="Onboarding3" component={Onboarding3} />
      <Stack.Screen name="Onboarding4" component={Onboarding4} />
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="MainStack" component={MainStack} />
    </Stack.Navigator>
  );
};

export default OnboardingStack;
