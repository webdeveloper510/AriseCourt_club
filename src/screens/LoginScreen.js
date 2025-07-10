import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
  SafeAreaView,
  ImageBackground,
  Modal,
  FlatList,
} from 'react-native';
import CommonInput from '../components/CommonInput';
import { ScrollView } from 'react-native-gesture-handler';
import BackButton from '../components/BackButton';
import theme from '../constant/theme';
import Colors from '../constant/Colors';
import PrimaryButton from '../components/PrimaryButton';
import CountryPicker from '../components/CountryPicker';
import { getAllCourts, getCourtById, SignInApi } from '../Apis';
import { showMessage } from 'react-native-flash-message';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('phone');
  const userTypes = [
    { type: 'Coach', code: '2' },
    { code: '3', type: 'Player' },
  ];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [location, setLocation] = useState([]);
  const [courts, setCourts] = useState([]);
  const [courtId, setCourtId] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  console.log('type===>', selectedType);
  const onSelect = type => {
    getCourts(type);
    setSelectedType(type);
    setVisible(false);
  };

  const onSelect1 = type => {
    console.log('type===>', type);
    setCourtId(type);
    setVisible1(false);
  };
  useEffect(() => {
    getAllLocation();
  }, []);
  const getAllLocation = async () => {
    try {
      console.log('@@@@@@@@@@@@@1');
      let res = await getAllCourts();
      setLocation(res.results);
      console.log('response ===>', res.results);
    } catch (error) {
      console.log('###############=====>', error.response);
    }
  };

  const getTypeByCode = code => {
    const item = location.find(entry => entry.id === code);
    return item ? item.description : null;
  };
  const getCourtByCode = code => {
    const item = courts.find(entry => entry.court_id === code);
    return item ? item.court_number : null;
  };
  const getCourts = async value => {
    try {
      const res = await getCourtById(value);
      setCourts(res.courts);
      console.log('🚀 ~ getCourts ~ res:123', res);
    } catch (error) {
      console.log('🚀 ~ getCourts ~ error:', error);
    }
  };

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      showMessage({ message: 'Email is required', type: 'danger' });
      return false;
    }
    if (!emailRegex.test(email)) {
      showMessage({ message: 'Invalid email format', type: 'danger' });
      return false;
    }
    if (!password.trim()) {
      showMessage({ message: 'Password is required', type: 'danger' });
      return false;
    }
    if (password.length < 6) {
      showMessage({
        message: 'Password must be at least 6 characters',
        type: 'danger',
      });
      return false;
    }
    if (!selectedType) {
      showMessage({ message: 'Location is required', type: 'danger' });
      return false;
    }
    if (!courtId) {
      showMessage({ message: 'Court ID is required', type: 'danger' });
      return false;
    }

    return true;
  };

  const onRegister = async () => {
    try {
      setIsLoading(true); // start loading immediately
      if (!validate()) {
        console.log('#####12344===>');
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      let data = {
        email: email,
        password: password,
        location_id: selectedType,
        court_id: courtId,
      };
      console.log('@@@@@@@@@@@@===on login=>', data);
      const res = await SignInApi(data);
      if (res.code == '400') {
        showMessage({ message: res.message, type: 'danger' });
      } else {
        navigation.navigate('MainStack', {
          screen: 'Home', // inside MainStack
          params: { data: res.slots },
        });
      }
      console.log('@@@@@@@@@@@response login api', res.slots);
      setIsLoading(false);
    } catch (error) {
      console.log('🚀 ~ onRegister ~ error:', error);
      setIsLoading(false);
      if (error?.response && error?.response.status === 400) {
        const errorMsg = error?.response?.data.errors;
        showMessage({ message: errorMsg, type: 'danger' });
      }
    }
    // Submit to your API here
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../assets/background.png')}
        style={{
          width: width,
          height: height,
          // justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor:'red'
            }}
          >
            <Image
              source={require('../assets/logo2.png')}
              style={{ width: 38, height: 38 }}
            />
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                color: '#ffffff',
                paddingLeft: 10,
              }}
            >
              Arise Court
            </Text>
          </View>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>Welcome Back</Text>

          {/* Tabs */}

          {/* Input Fields */}

          <>
            <CommonInput
              label="Email*"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
            />
          </>

          <CommonInput
            label="Password*"
            value={password}
            onChangeText={setPassword}
            placeholder="********"
            secureTextEntry={hidePassword}
            rightIcon={
              <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                <Image
                  source={require('../assets/eye.png')}
                  style={{ width: 17, height: 16, paddingRight: 10 }}
                />
              </TouchableOpacity>
            }
          />

          <CommonInput
            label="Select location*"
            //   value={password}
            //   onChangeText={setPassword}
            placeholder={
              selectedType ? getTypeByCode(selectedType) : 'Select location'
            }
            isEdit={false}
            rightIcon={
              <TouchableOpacity onPress={() => setVisible(true)}>
                <Image
                  resizeMode="contain"
                  source={require('../assets/drop.png')}
                  style={{ width: 15, height: 15, paddingRight: 10 }}
                />
              </TouchableOpacity>
            }
          />

          <CommonInput
            label="Select Court No.*"
            //   value={password}
            //   onChangeText={setPassword}
            placeholder={courtId ? getCourtByCode(courtId) : 'Select type'}
            isEdit={false}
            rightIcon={
              <TouchableOpacity
                onPress={() => setVisible1(true)}
                disabled={selectedType ? false : true}
              >
                <Image
                  resizeMode="contain"
                  source={require('../assets/drop.png')}
                  style={{ width: 15, height: 15, paddingRight: 10 }}
                />
              </TouchableOpacity>
            }
          />

          <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
          <PrimaryButton
            title="LOGIN"
            width={'100%'}
            height={60}
            onPress={onRegister}
            isLoading={isLoading}
          />
          <Modal visible={visible} transparent animationType="fade">
            <TouchableOpacity
              style={styles.modalOverlay}
              onPress={() => setVisible(false)}
            >
              <View style={styles.dropdownList}>
                <FlatList
                  data={location}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      key={item.code}
                      style={styles.option}
                      onPress={() => onSelect(item.id)}
                    >
                      <Text style={styles.optionText}>{item.description}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableOpacity>
          </Modal>
          <Modal visible={visible1} transparent animationType="fade">
            <TouchableOpacity
              style={styles.modalOverlay}
              onPress={() => setVisible1(false)}
            >
              <View style={styles.dropdownList}>
                <FlatList
                  data={courts}
                  keyExtractor={item => item.court_id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      key={item?.court_id}
                      style={styles.option}
                      onPress={() => onSelect1(item.court_id)}
                    >
                      <Text style={styles.optionText}>{item.court_number}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    width: '42%',
    // backgroundColor:'red',
    marginTop: 30,
    // padding: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 10,
    fontFamily: theme.bold,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 19,
    color: '#ffffff',
    marginBottom: 20,
    fontFamily: theme.medium,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    marginRight: 20,
    fontSize: 18,
    fontWeight: '600',
    color: '#888',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    paddingBottom: 4,
  },
  tabActive: {
    color: '#0066FF',
    // borderBottomColor: '#0066FF',
  },
  label: {
    fontSize: 14,
    color: Colors.primary,
    // marginBottom: 4,
    fontWeight: '600',
    textAlign: 'left',
    paddingLeft: 15,
    paddingTop: 10,
    fontFamily: theme.medium,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  forgotText: {
    fontSize: 13,
    alignSelf: 'flex-start',
    marginBottom: 20,
    color: '#ffffff',
    fontFamily: theme.medium,
  },
  loginBtn: {
    backgroundColor: '#0066FF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  termsText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 17,
  },
  createText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: theme.bold,
  },
  image: {
    width: width * 0.9,
    height: height * 0.45,
    alignSelf: 'center',
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
  container1: {
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    paddingBottom: 5,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 140,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
  },
  dropdownList: {
    width: '58%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 8,
    elevation: 5,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  error: {
    color: 'red',
    paddingLeft: 5,
    paddingBottom: 20,
    paddingTop: 5,
  },
});
