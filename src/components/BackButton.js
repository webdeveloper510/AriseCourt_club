import React from 'react';
import { TouchableOpacity, Text, StyleSheet,Image } from 'react-native';
import Colors from '../constant/Colors';
import theme from '../constant/theme';
const BackButton = ({navigation}) => {

  return (
    <TouchableOpacity
      onPress={()=> navigation.goBack()}
      style={[styles.button]}
      activeOpacity={0.8}
    >
        <Image source={require('../assets/back.png')} style={{width:7,height:12}}/>
      <Text style={[styles.buttonText]}>Back</Text>
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {
    // paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    flexDirection:'row',
    position:'absolute',
    left:20,
  },
  buttonText: {
    color: Colors.primary,
    fontWeight: '700',
    fontSize: 14,
    fontFamily:theme.medium,
    paddingLeft:5
  },
  disabled: {
    opacity: 0.6,
  },
});
