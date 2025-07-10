import React,{useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput
} from 'react-native';
import theme from '../constant/theme';
import Colors from '../constant/Colors';
import BackButton from '../components/BackButton';
import PrimaryButton from '../components/PrimaryButton';
import CommonInput from '../components/CommonInput';
import { ScrollView } from 'react-native-gesture-handler';

const {height, width} = Dimensions.get('window');

const ResetPassword = ({navigation}) => {
      const [modalVisible, setModalVisible] = useState(false);
        const [password, setPassword] = useState('');
        const [hidePassword, setHidePassword] = useState(true);
  return (
    <ScrollView>
    <View style={styles.container}>
      <BackButton navigation={navigation} />

      <Image
        source={require('../assets/reset.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={{height: 38}} />
      <Text style={styles.title}>Set new password</Text>
      <Text style={styles.subtitle}>Your password must be at least 8 characters</Text>
     <CommonInput
            label="New Password*"
            value={password}
            onChangeText={setPassword}
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
            value={password}
            onChangeText={setPassword}
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
      <PrimaryButton title="Set Password" width={'100%'} height={60} onPress={()=> navigation.navigate('ResetPassword')} />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.backToLogin}>Back to Login</Text>
      </TouchableOpacity>
        
    </View>
    </ScrollView>
  );
};

export default ResetPassword;

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
    alignItems: 'center'
  },

   
});
