import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Colors from '../constant/Colors';
const PrimaryButton = ({
  title,
  onPress,
  style,
  textStyle,
  disabled,
  width,
  height,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        style,
        disabled && styles.disabled,
        { width: width, height: height },
      ]}
      activeOpacity={0.8}
      disabled={disabled}
    >
      {isLoading ? (
        <ActivityIndicator color={'#ffffff'} size={'small'} />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  disabled: {
    opacity: 0.6,
  },
});
