import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';
import Colors from '../constant/Colors';
import theme from '../constant/theme';


const CommonHeader = ({ title, onBack }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onBack} style={{flexDirection:'row',alignItems:'center'}}>
    <Image source={require('../assets/back.png')} style={{width:7,height:12}}/>
    <Text style={{paddingLeft:7,color:Colors.primary,fontFamily:theme.medium}}>Back</Text>
    </TouchableOpacity>
    <Text style={styles.title}>{title}</Text>
    <View style={{ width: 24 }} />
  </View>
);

export default CommonHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    // fontWeight: '700',
    color: '#182B4D',
    fontFamily:theme.bold
  },
});
