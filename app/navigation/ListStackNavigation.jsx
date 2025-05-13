import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExpenseScreen from '../screens/ExpenseScreen';
import EditTransaction from '../screens/EditTransaction';

const Stack = createNativeStackNavigator();

export default function ListStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Expense" component={ExpenseScreen} />
      <Stack.Screen name="EditTransaction" component={EditTransaction} />
    </Stack.Navigator>
  );
}