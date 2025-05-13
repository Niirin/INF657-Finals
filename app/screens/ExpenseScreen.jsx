import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useMemo, useContext } from 'react'
import { useNavigation } from '@react-navigation/native';
import Header from '../components/shared/Header'
import MyCard from '../components/shared/Card'
import { Chip, FAB } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TransactionContext from '../context/TransactionContext';
import { Swipeable } from 'react-native-gesture-handler';

export default function ExpenseScreen() {
    const navigation = useNavigation();
    const [selectedTag, setSelectedTag] = useState(false);

    //accessing the transactionList
    const { transactionList, getMonthlyTotals, confirmDeleteTransaction }= useContext(TransactionContext);
    const monthlyTotals = useMemo(() => getMonthlyTotals(), [transactionList]);

    //code to get monthly expense and income
    const currentMonthYear = new Date().toLocaleString("default", {
      month: "long",
      year: "numeric"
    });

    const incomeThisMonth = monthlyTotals[currentMonthYear]?.income || 0;
    const expenseThisMonth = monthlyTotals[currentMonthYear]?.expense || 0;

    const handleAdd= () => {
        console.log('Add button pressed');
        navigation.navigate("AddNew");
    } 

    const renderRightActions = (transId) => (
      <TouchableOpacity
        onPress={() => confirmDeleteTransaction(transId)}
        style={styles.deleteButton}
      >
        <MaterialCommunityIcons name="trash-can" size={35} color={'black'}/>
      </TouchableOpacity>
    );

    // Navigate to the edit screen with the selected transaction's data
    const handleCardPress = (trans) => {
        navigation.navigate('EditTransaction', { transaction: trans.data, id: trans.id });
    };


  return (
    <SafeAreaView style={{ flex: 1 }}>
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
                <Text style={styles.cardExpense}>${expenseThisMonth.toFixed(2)}</Text>
            </MyCard>
            <MyCard style={styles.cardHero}>
                <Text style={styles.cardTitle}>Income So Far:</Text>
                <Text style={styles.cardIncome}>${incomeThisMonth.toFixed(2)}</Text>
            </MyCard>
        </View>
        {/* Expense/Income or Transaction List */}
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, paddingLeft: 10 }}>All transactions</Text>
          <FlatList
            style={{ flex: 1 }}
            data={transactionList}
            renderItem={({ item }) => {
              const trans = item.data;
              const dateStr = trans.date ? 
              new Date(trans.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : "";
              return (
                <Swipeable renderRightActions={() => renderRightActions(item.id)}>
                  <TouchableOpacity onPress={() => handleCardPress(item)}>  {/* Make card clickable */}
                    <MyCard style={styles.cardList}>
                      <View style={styles.cardListCont}>
                          <MaterialCommunityIcons 
                          name={trans.type === "expense" ? "credit-card-minus" : "credit-card-plus-outline"} 
                          size={24} 
                          color={trans.type === "expense" ? 'red' : 'green'} />
                          <View>
                              <Text style={styles.cardTitle}>{trans.title}</Text>
                              <Text style={styles.cardText}>Category: {trans.category}</Text>
                              <Text style={styles.cardSub}>{dateStr}</Text>
                          </View>
                      </View>
                      <Text style={trans.type === "expense" ? styles.cardExpense : styles.cardIncome}>${trans.amount.toFixed(2)}</Text>
                    </MyCard>
                  </TouchableOpacity>
                </Swipeable>
              )
            }}
            keyExtractor={item => item.id}
            />
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
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    marginBottom: 3
  },
  cardSub: {
    fontSize: 14,
    color: 'gray'
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
  noText: {
    textAlign: 'center',
    marginTop: 20
  },
  cardList:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 0
  },
  cardListCont: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    margin: 5,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },

});