import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Feather from '@react-native-vector-icons/feather';
import Colors from '../constant/Colors';
import theme from '../constant/theme';
const CourtItem = ({ item, selected, onSelect }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onSelect}>
      <Image source={{ uri: item.logo }} style={styles.logo} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.address}>{item.address}</Text>
      </View>
      <View style={styles.checkWrap}>
        {selected && <Feather name="check" color={Colors.primary} size={20} />}
      </View>
    </TouchableOpacity>
  );
};

export default CourtItem;

const styles = StyleSheet.create({
container: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 12,
    borderRadius: 20,
  },
  name: {
    fontFamily:theme.bold,
    fontSize: 14,
    color: '#000',
  },
  address: {
    fontSize: 10,
    color: '#707C90',
    fontFamily:theme.medium
  },
  checkWrap: {
    width:20,
    height:20,
    borderRadius:20/2,
    backgroundColor:'#0860FB1A',
    borderWidth:0.5,
    borderColor:Colors.primary
  },
});
