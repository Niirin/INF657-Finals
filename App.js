import { SafeAreaView, StyleSheet  } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './app/navigation/Navigation';
import { AuthContextProvider } from "./app/context/AuthContext";
import { PaperProvider } from "react-native-paper";
import {TransactionProvider} from "./app/context/TransactionContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <NavigationContainer>
            <AuthContextProvider>
              <TransactionProvider>
                <PaperProvider>
                  <Navigation />
                </PaperProvider>
              </TransactionProvider>
            </AuthContextProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'lightgray',
  }
});
