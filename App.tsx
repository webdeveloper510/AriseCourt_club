import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainNavigator from './src/navigation/mainNavigator';
import FlashMessage from 'react-native-flash-message';
export default function App() {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MainNavigator />
       <FlashMessage style={{paddingTop: 32}} position="top" />
    </GestureHandlerRootView>
  );
}
