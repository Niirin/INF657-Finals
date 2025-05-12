import { SafeAreaView, StyleSheet  } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './app/navigation/Navigation';
// import { AuthContextProvider } from "./app/context/AuthContext";
import { PaperProvider } from "react-native-paper";

export default function App() {
  return (
      // <AuthContextProvider>
        <NavigationContainer>
          <PaperProvider>
            <SafeAreaView style={styles.root}>
              <Navigation />
            </SafeAreaView>
          </PaperProvider>
        </NavigationContainer>
      // </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'lightgray',
  }
});
