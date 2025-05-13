import { StyleSheet, View, useWindowDimensions, Text } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import { UserAuth } from '../context/AuthContext';
import CustomButton from '../components/shared/CustomButton';
import CustomInput from '../components/shared/CustomInput';

export default function SignInScreen() {
    // Usestates for signing in
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {height} = useWindowDimensions();

    const navigation = useNavigation();

    const { signIn, logOut } = UserAuth();

    //handler functions for buttons
    const onSignIn= async(e) => {
        e.preventDefault();
        try{
            await signIn(email, password);
            console.log("Signed In", email, "moving to Home");
            navigation.navigate("Home");
        } catch(err) {
            console.error(err);
        }
    }

    const onForgot= () => {
        console.warn('Forgot password pressed');
    }

    const onSignInGoogle= () => {
        console.warn('Google pressed');
    }

    const onSignUp= () => {
        console.warn('SignUp pressed');
        navigation.navigate("SignUp")
    }
    const onLogOut= async () => {
        try {
            await logOut();
            alert('Logged Out');
            navigation.navigate("SignIn");
        } catch(err) {
            console.error(err);
        }
    }
  return (
    <View>
        <Text style={styles.title}>Welcome to Purple Finance!</Text>
        <Text style={styles.title}>Sign In</Text>
        <CustomInput placeholder='Email' value={email} setValue={setEmail} />
        <CustomInput placeholder='Password' value={password} setValue={setPassword} secureTextEntry={true}/>
        <CustomButton onPress={onSignIn} buttonText={'Sign In'} />
        <CustomButton buttonText="Forgot Password" onPress={onForgot} bgColor='#8ed1fc' textColor='black'/>
        <CustomButton buttonText="Sign In with Google" onPress={onSignInGoogle} bgColor='pink' textColor='black' />
        <CustomButton buttonText="Don't Have an Account? Create one!" onPress={onSignUp} bgColor='gray'/>
        <CustomButton buttonText="Log Out" onPress={onLogOut} bgColor='red' textColor='black'/>
    </View>
  )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#483d8b',
        margin: 12,
        marginTop: 30,
    }
})