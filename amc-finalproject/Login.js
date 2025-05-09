import { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import LoginImage from './assets/loginImage.png';
import { Eye, EyeClosed } from 'lucide-react-native';



const { width, height } = Dimensions.get('window');

export default function Login({ onLogIn }) {
const [userName, setUserName] = useState('');
const [password, setPassword] = useState('');
const [loading, setLoading] = useState(false);
 const [showPassword, setShowPassword] = useState(false);

const handleLogin = () => {
  const trimmedUserName = userName.trim()
  const trimmedPassword = password.trim();

  if (!trimmedUserName || !trimmedPassword) {
    Alert.alert('Missing Fields', 'Please enter email and password.');
    return;
  }


  setLoading(true);

  setTimeout(() => {
    setLoading(false);

  const users = {
    user: 'user',
    admin: 'admin',
    louiejie: '123'
  };

    if (users[trimmedUserName] && users[trimmedUserName] === trimmedPassword) {
      onLogIn(trimmedUserName);
    } else {
      Alert.alert('Login Failed', 'Invalid username or password.');
    }
  }, 1500);
};

  return (
    <View style={style.container}>
      <View style={style.circleTop}></View>
      <Text style={style.heading}>Login</Text>
      <Image source={LoginImage} style={{ width: 180, height: 180,}} />
      <View >
      <View style={style.textInputContiner}>
        <Text style={{color: "#0081F1", paddingTop: 5}}>Username:</Text>
        <TextInput
          style={style.input}
          value={userName}
          onChangeText={setUserName}
        />
        </View>
        <View style={style.textInputContiner}>
        <Text style={{color: '#0081F1', paddingTop: 5}}>Password:</Text>
        <View style={style.textInput}>
        <TextInput
          style={style.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
        {showPassword ? <EyeClosed color="#0081F1" size={22}/> : <Eye color="#0081F1" size={22}/>}
      </TouchableOpacity>
      </View>
      </View>
        <TouchableOpacity onPress={handleLogin} style={style.button} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={{ color: "white", fontWeight: "bold" }}>Login</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={style.buttomShape}></View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    height: "100%"
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "#D94559"
  },
  input: {
    marginBottom: 3,
    borderRadius: 8,
    outlineStyle: 'none',
    width: 200
  },
  textInput: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 5,
    fontSize: 16,
    width: "100%"
  },
  textInputContiner: {
    paddingHorizontal: 15,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: '#1a5592',
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: "#fff"
   
  },
  button: {
    backgroundColor: '#D94559',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50,
  },
  circleTop: {
    position: "absolute",
    top: -height * 0.16,
    left: width / 2,
    transform: [{ translateX: -150 }],
    backgroundColor: "#E9EEFD",
    height: "40%",
    width: "30%",
    zIndex: -5,
    borderRadius: 150,
  },
  buttomShape: {
    position: "absolute",
    bottom: -height * 0.34,
    left: width / 6,
    backgroundColor: "#E9EEFD",
    height: "70%",
    width: "100%",
    zIndex: -5,
    borderRadius: 80,
    transform: [{ rotate: '120deg' }]
  },
});
