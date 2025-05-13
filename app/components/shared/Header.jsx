import { View, Text, StyleSheet, Image, SafeAreaView, Touchable, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Header(props) {

  const handleSearch = () => {
    console.log('Search button pressed');
  }
  return (
    <SafeAreaView style ={styles.container}>
      <View style = {styles.headerContainer}>
        <View style={styles.avatarContainer}>
          <Image source={require('../../../assets/cute-anime-girl-pfp.jpg')} style = {styles.avatar}/>
          <View>
            <Text style={styles.headerText}>Hello&#128075;</Text>
            <Text style={styles.subHeaderText}>Welcome back, {props.name}!</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => handleSearch()}>
          <FontAwesome name="search" size={24} color="#fff" style={styles.search} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({ 
  container :{
    backgroundColor: '#483d8b',
    padding: 30,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  search:{
    padding: 10,
  },
  headerText: {
    color: "#fff",
    fontSize: 16,
  },
  avatar: {
    verticalAlign: 'middle',
    width: 50,
    height: 50,
    borderRadius: 30,
    margin: 10,
  },
  subHeaderText: {
    color: '#a9a9a9',
    fontSize: 14,
  },
  })