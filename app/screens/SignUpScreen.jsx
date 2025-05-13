import { StyleSheet, View, Text, useWindowDimensions } from 'react-native'
import React, {useState} from 'react'
import CustomInput from '../components/shared/CustomInput';
import CustomButton from '../components/shared/CustomButton';
import { UserAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';


export default function SignUpScreen() {
  //Usestates
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {height} = useWindowDimensions();
  const [email, setEmail] = useState('');

  //user creating
  const { createUser } = UserAuth();

  const navigation = useNavigation();

  //handler function
  const onSignUp= async(e) => {
    e.preventDefault();
    const data = [username, email, password, confirmPassword];
    //console.log(data);
    try {
        await createUser(email, password).then((userCredential) => {
            user = userCredential.user;
            console.log(user);
            navigation.navigate("Home");
        })
    }catch(err){
        console.log(err);
    }
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const onSignIn= () => {
    navigation.navigate("SignIn");
  }
  
  return (
    <View>
      <Text style={styles.title}>Create an Account</Text>
      <CustomInput placeholder='Username' value={username} setValue={setUsername} />
      <CustomInput placeholder='Email' value={email} setValue={setEmail} />
      <CustomInput placeholder='Password' value={password} setValue={setPassword} secureTextEntry={true}/>
      <CustomInput placeholder='Confirm Password' value={confirmPassword} setValue={setConfirmPassword} secureTextEntry={true}/>
      <CustomButton onPress={onSignUp} buttonText={'Sign Up'} />
      <CustomButton buttonText="Already Have an Account? Sign In" onPress={onSignIn} bgColor='gray'/>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#483d8b',
    margin: 12,
  }
})