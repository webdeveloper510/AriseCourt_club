import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Colors from '../constant/Colors';
import {ScrollView} from 'react-native-gesture-handler';
import BackButton from '../components/BackButton';
import theme from '../constant/theme';
import CommonInput from '../components/CommonInput';
import PrimaryButton from '../components/PrimaryButton';
import CountryPicker from '../components/CountryPicker';
const {height, width} = Dimensions.get('window');

const SignupScreen = ({navigation}) => {
  const [hidePassword, setHidePassword] = useState(true);
   const [modalVisible, setModalVisible] = useState(false);
    const [phone, setPhone] = useState('');
    const [flag, setFlag] = useState(require('../assets/flags/nl.png'));
    const [countryName, setCountryName] = useState('Netherlands');
    const [countryCode, setCountryCode] = useState('31');
  return (
    <ScrollView>
      <View style={styles.container}>
        <BackButton navigation={navigation} />
        <Text style={styles.testStyle}>Register</Text>
        <Text style={styles.description}>
          Enter your details to get started.
        </Text>
        <CommonInput
          label="First Name*"
          // value={email}
          // onChangeText={setEmail}
          placeholder="Enter here...."
        />
        <CommonInput
          label="Last Name*"
          // value={email}
          // onChangeText={setEmail}
          placeholder="Enter here...."
        />
        <CommonInput
          label="Email Address*"
          // value={email}
          // onChangeText={setEmail}
          placeholder="Enter your email"
        />
        <View style={styles.container1}>
          <Text style={styles.label}>Phone Number*</Text>
          <View style={styles.phoneContainer}>
            <TextInput
              style={styles.phoneInput}
              placeholder="Phone Number"
              value={phone}
              keyboardType="phone-pad"
              onChangeText={setPhone}
            />
            <View style={styles.countryCodeBox}>
              <TouchableOpacity
                style={styles.contryCodePicker}
                onPress={() => setModalVisible(true)}>
                <Image source={flag} style={styles.flag} resizeMode="cover" />

                <Text style={styles.countryCode}>+{countryCode}</Text>
              </TouchableOpacity>
              {/* <Text>🇺🇸 +1</Text> */}
            </View>
          </View>
        </View>
        <CommonInput
          label="Password*"
          //   value={password}
          //   onChangeText={setPassword}
          placeholder="********"
          secureTextEntry={hidePassword}
          rightIcon={
            <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
              <Image
                source={require('../assets/eye.png')}
                style={{width: 17, height: 16, paddingRight: 10}}
              />
            </TouchableOpacity>
          }
        />
        <CommonInput
          label="Confirm Password*"
          //   value={password}
          //   onChangeText={setPassword}
          placeholder="********"
          secureTextEntry={hidePassword}
          rightIcon={
            <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
              <Image
                source={require('../assets/eye.png')}
                style={{width: 17, height: 16, paddingRight: 10}}
              />
            </TouchableOpacity>
          }
        />
        <PrimaryButton title="Register Now" width={'100%'} height={60} />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonStyle}>Back to Login</Text>
        </TouchableOpacity>
      </View>
           <CountryPicker
          modalVisible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
          flag={flag}
          countryName={countryName}
          onPress={(title, flag, code) => {
            setFlag(flag);
            setCountryName(title);
            setCountryCode(code);
            setModalVisible(false);
          }}
        />
    </ScrollView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  logo: {
    height: 100,
    width: 100,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#14213D',
  },
  bottomImage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: height * 0.35,
    width: width,
  },
  testStyle: {
    fontSize: 24,
    fontFamily: theme.bold,
  },
  description: {
    fontSize: 13,
    fontFamily: theme.medium,
    color: Colors.secondary,
    paddingBottom: 20,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  backButtonStyle: {
    color: Colors.primary,
    textAlign: 'center',
    paddingVertical: 15,
    fontFamily: theme.bold,
  },
    container1: {
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    paddingBottom: 5,
  },
  label:{
    fontSize: 14,
    color: Colors.primary,
    // marginBottom: 4,
    fontWeight: '600',
    textAlign: 'left',
    paddingLeft: 15,
    paddingTop: 10,
    fontFamily: theme.medium,
  },
    countryCodeBox: {
    // paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#D9D9D9',
    height: 30,
  },
  phoneInput: {
    width: '75%',
    // flex: 1,
    paddingLeft: 20,
    // paddingTop:10,
    // paddingVertical: 12,
    fontSize: 12,
    color: '#000',
    height: 35,
    backgroundColor: '#fff',
  },
    contryCodePicker: {
      flexDirection: 'row',
      alignItems: 'center',
      height: '100%',
      paddingLeft: 15,
      borderRadius: 100,
      alignItems: 'center',
    },
    flag: {
      width: 18,
      height: 14,
      marginRight: 10,
    },
    countryCode: {
      color: theme.black,
      fontSize: 12,
      fontFamily: theme.futuraBold,
    },
});
