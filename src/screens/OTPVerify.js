import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import theme from '../constant/theme';
import Colors from '../constant/Colors';
import BackButton from '../components/BackButton';
import PrimaryButton from '../components/PrimaryButton';
import CountryPicker from '../components/CountryPicker';
const {height, width} = Dimensions.get('window');

const OTPVerifyScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const inputRefs = useRef([]);

  const handleChange = (text, index) => {
    if (text.length === 1 && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };
  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} />

      <Image
        source={require('../assets/otpimg.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={{height: 60}} />
      <Text style={styles.title}>Please Check your email</Text>
      <Text style={styles.subtitle}>Enter OTP to reset password</Text>
      <View style={styles.otpContainer}>
        {[0, 1, 2, 3, 4, 5].map((_, index) => (
          <TextInput
            key={index}
            ref={ref => (inputRefs.current[index] = ref)}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={text => {
              if (text.length === 1 && index < 5) {
                inputRefs.current[index + 1].focus();
              }
              if (text === '' && index > 0) {
                inputRefs.current[index - 1].focus();
              }
            }}
            onKeyPress={({nativeEvent}) => {
              if (nativeEvent.key === 'Backspace' && index > 0) {
                inputRefs.current[index - 1].focus();
              }
            }}
          />
        ))}
      </View>
      <TouchableOpacity>
        <Text style={styles.resendText}>Resend OTP</Text>
      </TouchableOpacity>
      <PrimaryButton
        title="Continue"
        width={'100%'}
        height={60}
        onPress={() => navigation.navigate('ResetPassword')}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.backToLogin}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OTPVerifyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 80,
    backgroundColor: Colors.background,
  },
  backText: {
    color: Colors.primary,
    marginBottom: 20,
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 250,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
    // textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    // textAlign: 'center',
    marginVertical: 10,
  },
  backToLogin: {
    marginTop: 20,
    textAlign: 'center',
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  otpInput: {
    width: 48,
    height: 55,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color:Colors.primary
  },
  resendText: {
    color: '#0066FF',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'left',
    marginBottom: 25,
    marginRight: 10,
  },
});
