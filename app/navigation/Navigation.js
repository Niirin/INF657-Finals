import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../components/screens/SignInScreen';
import SignUpScreen from '../components/screens/SignUpScreen';
import ExpenseScreen from '../components/screens/ExpenseScreen';
import AddTransaction from '../components/screens/AddTransaction';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
  // <NavigationContainer>
    <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} /> */}
        <Stack.Screen name="Home" component={ExpenseScreen} />
        <Stack.Screen name="AddNew" component={AddTransaction} />
    </Stack.Navigator>
  // </NavigationContainer>
  )
}
