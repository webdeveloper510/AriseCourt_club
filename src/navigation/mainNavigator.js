import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import SplashScreen from '../screens/SplashScreen';
import AuthStack from './AuthStack';
import MainStack from './mainStack';
import Colors from '../constant/Colors';
const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // simulate async check
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  if (isLoading) return <SplashScreen />;

  return (
    <NavigationContainer>
         <StatusBar
        backgroundColor={Colors.background} // your app background color
        barStyle="dark-content" // or 'light-content' depending on contrast
      />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        { !isLoggedIn ? (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        ) : (
          <Stack.Screen name="MainStack" component={MainStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
