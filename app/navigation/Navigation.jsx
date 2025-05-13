import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AddTransaction from '../screens/AddTransaction';
import HomeScreen from '../screens/HomeScreen';


const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
      <Stack.Navigator initialRouteName="SignIn" screenOptions={{headerShown: false}}>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddNew" component={AddTransaction} />
      </Stack.Navigator>
  )
}
