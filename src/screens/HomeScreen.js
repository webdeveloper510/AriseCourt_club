import React, { useState,useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import Colors from '../constant/Colors';
import theme from '../constant/theme';
import moment from 'moment';
const { height, width } = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { SignInApi } from '../Apis';
const HomeScreen = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const { data = [] } = route.params || {};
  const [isLoading, setIsLoading] = useState(false);
  const [courtData, setCourtData] = useState(data);
  const [showModal, setShowModal] = useState(data?.length === 0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentCourt = courtData[currentIndex];

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const onRefrash = () => {
    setIsLoading(true);
    setCurrentIndex(0);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const onRefrash1 = async () => {

    try {
      const credentials = await AsyncStorage.getItem('userCredentials');
      if (!credentials) {
        console.log('No credentials found.');
        setIsLoading(false);
        return;
      }

      const { email, password, location_id, court_id } =
        JSON.parse(credentials);

      // Replace with your actual login endpoint
      const response = await SignInApi({
        email,
        password,
        location_id,
        court_id
      });

      if (response?.data?.courtData) {
        setCourtData(response.data.courtData);
        setCurrentIndex(0);
      }
    } catch (error) {
      console.error('Failed to refresh court data:', error);
    } 
  };

  // Auto-refresh every 15 minutes
  useEffect(() => {
    let interval;

    if (isFocused) {
      interval = setInterval(() => {
        onRefrash1();
      }, 15 * 60 * 1000); // 15 minutes
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isFocused]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../assets/background.png')}
        style={{
          width: width,
          height: height - 45,
          // justifyContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <TouchableOpacity
          style={{
            width: 60,
            height: 30,
            backgroundColor: 'red',
            left: 25,
            top: 35,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: '#1D2A4D',
            position: 'absolute',
          }}
          onPress={onRefrash}
        >
          {isLoading ? (
            <ActivityIndicator size={'small'} color={'#ffffff'} />
          ) : (
            <Image
              source={require('../assets/refresh.png')}
              style={{ width: 25, height: 25 }}
            />
          )}
        </TouchableOpacity>
        {currentCourt ? (
          <>
            <View style={styles.leftArrow}>
              <TouchableOpacity
                onPress={handlePrevious}
                disabled={currentIndex === 0}
              >
                <Image
                  source={require('../assets/left.png')}
                  style={{
                    width: 30,
                    height: 20,
                    opacity: currentIndex === 0 ? 0.3 : 1,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.courtNumberBanner}>
              <Text style={styles.courtNumberTitle}>Court Number</Text>
              <Text style={styles.courtNumberValue}>
                {currentCourt.court_number}
              </Text>
            </View>
            <View style={styles.card}>
              {/* Court Number Banner */}
              {/* <View style={styles.courtNumberBanner}>
              <Text style={styles.courtNumberTitle}>Court Number</Text>
              <Text style={styles.courtNumberValue}>08</Text>
            </View> */}
              <View style={styles.leftView}>
                <View style={styles.box}>
                  <View>
                    <Text style={styles.label}>Reserved For</Text>
                    <Text style={styles.value}>{currentCourt?.user_name}</Text>
                  </View>
                </View>
                <View style={styles.box}>
                  <View>
                    <Text style={styles.label}>Reserved Date</Text>
                    <Text style={styles.value}>
                      {currentCourt?.booking_date}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.centerView}>
                <View style={styles.centerBox}>
                  <Image
                    source={require('../assets/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                  <Text style={styles.logoText}>Arise{'\n'}Court</Text>
                </View>
              </View>
              <View style={styles.rightView}>
                <View style={styles.box}>
                  <View>
                    <Text style={[styles.label, { textAlign: 'right' }]}>
                      From Time
                    </Text>
                    <Text style={styles.value}>
                      {moment(currentCourt?.start_time, 'HH:mm').format(
                        'hh:mm A',
                      )}
                    </Text>
                  </View>
                </View>
                <View style={styles.box}>
                  <View>
                    <Text style={[styles.label, { textAlign: 'right' }]}>
                      To Time
                    </Text>
                    <Text style={styles.value}>
                      {moment(currentCourt.end_time, 'HH:mm').format('hh:mm A')}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.rightArrow}>
              <TouchableOpacity
                onPress={handleNext}
                disabled={currentIndex === data.length - 1}
              >
                <Image
                  source={require('../assets/right.png')}
                  style={{
                    width: 30,
                    height: 20,
                    opacity: currentIndex === data.length - 1 ? 0.3 : 1,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <Text style={{ color: 'white', fontSize: 18 }}>
            No court data available
          </Text>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftView: {
    width: '42%',
    height: '100%',
    justifyContent: 'space-around',
  },
  rightView: {
    width: '42%',
    height: '100%',
    justifyContent: 'space-around',
  },
  centerView: {
    width: '16%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  //  container1: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   padding: 10,
  //   backgroundColor: '#1D2A4D', // background pattern tone
  // },
  arrowContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    // flex:1,
    width: '80%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: '60%',
    borderRadius: 20,
  },
  courtNumberBanner: {
    width: '25%',
    // height:130,
    backgroundColor: '#1A73E8',
    // paddingVertical: 10,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 10,
    borderColor: 'white',
  },
  courtNumberTitle: {
    color: 'white',
    fontSize: 40,
    fontWeight: '600',
  },
  courtNumberValue: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  box: {
    width: '95%',
    backgroundColor: '#102039',
    padding: 15,
    borderRadius: 15,
    // marginVertical: 10,
    marginHorizontal: 10,
    height: '45%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  label: {
    color: '#ADB5BD',
    fontSize: 30,
    marginBottom: 5,
    // fontWeight: 'bold',
    fontFamily: theme.futuraMedium,
  },
  value: {
    color: 'white',
    fontSize: 40,
    fontWeight: '600',
    fontFamily: theme.bold,
  },
  logo: {
    width: 120,
    height: 120,
  },
  logoText: {
    color: '#172E50',
    fontWeight: theme.bold,
    textAlign: 'center',
    fontSize: 35,
  },
  leftArrow: {
    width: 60,
    height: 57,
    backgroundColor: '#ffffff',
    position: 'absolute',
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  },
  rightArrow: {
    width: 60,
    height: 57,
    backgroundColor: '#ffffff',
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  },
});
