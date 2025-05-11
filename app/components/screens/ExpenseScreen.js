import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Header from '../shared/Header'
import MyCard from '../shared/Card'
import { Chip, FAB } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ExpenseScreen() {
    const navigation = useNavigation();
    const [selectedTag, setSelectedTag] = useState(false);


    const handleAdd= () => {
        console.log('Add button pressed');
        navigation.navigate("AddNew");
    } 

  return (
    <SafeAreaView>
        <Header name="Rin"/>
        <View style={styles.chipCont}>
            <Chip 
            type='outlined' 
            selectedColor='#4B0082'
            rippleColor='purple'
            accessibilityLabel='This month filter button'
            style={[
            styles.chip,
            selectedTag && { backgroundColor: '#4B0082' }
            ]}
            textStyle={[
            styles.chipText,
            selectedTag && { color: 'white' }
            ]}
            onPress={() => {
                console.log('This month chip pressed');
                setSelectedTag(!selectedTag)
            }}>
            This month
            </Chip>
            <FAB icon={() => (
                <MaterialCommunityIcons name='plus' color={'white'} size={24} />
            )}
            style={styles.fab}
            onPress={handleAdd} />
        </View>

        <View style={styles.cardMainCont}>
            <MyCard style={styles.cardHero}>
                <Text style={styles.cardTitle}>Expenses So Far:</Text>
                <Text style={styles.cardExpense}>$399</Text>
            </MyCard>
            <MyCard style={styles.cardHero}>
                <Text style={styles.cardTitle}>Income So Far:</Text>
                <Text style={styles.cardIncome}>$200</Text>
            </MyCard>
        </View>
        {/* Expense/Income or Transaction List */}
        <View>
            <MyCard style={styles.cardList}>
                <View style={styles.cardListCont}>
                    <MaterialCommunityIcons name="credit-card-minus" size={24} color={'red'} />
                    <View>
                        <Text style={styles.cardTitle}>Title</Text>
                        <Text style={styles.cardText}>Date</Text>
                    </View>
                </View>
                <Text>Amount</Text>
            </MyCard>
            <MyCard style={styles.cardList}>
                <View style={styles.cardListCont}>
                    <MaterialCommunityIcons name="credit-card-plus-outline" size={24} color={'green'} />
                    <View>
                        <Text style={styles.cardTitle}>Title</Text>
                        <Text style={styles.cardText}>Date</Text>
                    </View>
                </View>
                <Text>Amount</Text>
            </MyCard>
        </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  chipCont: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chip: {
    alignSelf: 'flex-start',
    margin: 10,
    backgroundColor: '#E6E6FA', // light lavender
    borderColor: '#9370DB', // medium purple
    borderWidth: 1,
    borderRadius: 20,
  },
  chipText: {
    color: '#4B0082', // indigo
    fontSize: 14,
    fontWeight: '600',
  },
  fab: {
    borderRadius: 30,
  },
  cardMainCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardHero:{
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4B0082',
    marginBottom: 5,
  },
  cardExpense:{
    fontSize: 20,
    fontWeight: '600',
    color: 'red',
  },
  cardIncome: {
    fontSize: 20,
    fontWeight: '600',
    color: 'green',
  },
  cardList:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cardListCont: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  expenseCard: {
  backgroundColor: '#FFE0E0', // light red
  borderLeftColor: 'red',
  borderLeftWidth: 4,
  },
  incomeCard: {
  backgroundColor: '#E0FFE0', // light green
  borderLeftColor: 'green',
  borderLeftWidth: 4,
},

});