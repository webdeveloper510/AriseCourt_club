import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen.js';
const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Home'>
      {/* <Stack.Screen name="Court" component={SearchCourtScreen} /> */}
      {/* <Stack.Screen name="Contact" component={ContactUsScreen} /> */}
      {/* <Stack.Screen name="Checkout" component={CheckoutScreen} /> */}
      <Stack.Screen name="Home" component={HomeScreen} />
      {/* <Stack.Screen name="BookAppointmentScreen" component={BookAppointmentScreen}/> */}
    </Stack.Navigator>
  );
};

export default MainStack;
 


