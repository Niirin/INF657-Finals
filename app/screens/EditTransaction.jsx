import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import CustomButton from '../components/shared/CustomButton';
import CustomInput from '../components/shared/CustomInput';
import { useState, useContext } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import Select from 'react-native-picker-select';
import TransactionContext from '../context/TransactionContext';
import { expenseCategories, incomeCategories } from '../data/categories';



export default function EditTransaction() {
    const navigation = useNavigation(); 
    const route = useRoute();
    const { transaction, id } = route.params;

    const {editTransaction, updateTransaction } = useContext(TransactionContext);

    //states
    const [amount, setAmount] = useState(transaction.amount.toString());
    const [title, setTitle] = useState(transaction.title);
    const [type, setType] = useState(transaction.type);
    const [category, setCategory]= useState(transaction.category);
    const [selectedDate, setDate]= useState(transaction.date);
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);

    const handleGoBack= () => {
        console.log('Cancel pressed');
        setTitle(transaction.title);
        setAmount(transaction.amount.toString());
        setType(transaction.type);
        setCategory(transaction.category);
        setDate(transaction.date);
        setDatePickerVisible(false);
        navigation.goBack();
    }

        //functions for date picker
        const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const onChange= (e, selectedDate) => {
        setDatePickerVisible(Platform.OS === 'ios');
        if (selectedDate) {
        setDate(selectedDate);
        console.log(selectedDate);
        setDatePickerVisible(!isDatePickerVisible);
        }
    };

    const handleUpdate= () => {
        console.log("Update button pressed");

        if (title && amount && type && category && selectedDate ) {
        const updatedTrans = {
            title,
            amount: parseFloat(amount), 
            type, 
            category, 
            date: selectedDate.toString(),
        };
        editTransaction(transaction);
        updateTransaction(id, updatedTrans)
        console.log(updatedTrans);
        //reset states
        setDatePickerVisible(false);
        navigation.goBack();
        }
        else {
            alert("Please enter all the fields");
        }
    }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewCont} >

        <Text style={styles.title}>Update Transaction</Text>
        <CustomInput placeholder='Enter Amount' value={amount} setValue={setAmount}/>
        <CustomInput placeholder='Enter Title' value={title} setValue={setTitle}/>
        {/* Picker for type of transaction */}
        <Select
        onValueChange={(value) => setType(value)}
        value={type}
        placeholder={{ label: 'Select a Type', value: null, color: 'lightgray'}}
        items={[
          { label: 'Expense', value: 'expense', color: 'red' },
          { label: 'Income', value: 'income', color: 'green' },
        ]}
        style={
          Platform.OS === 'web'
          ? { inputWeb: styles.inputWeb } : {inputAndroid: styles.inputAndroid, inputIOS: styles.inputIOS}}
        />
        {/* Picker for category */}
        {type !== '' && (
        <Select
          onValueChange={(value) => setCategory(value)}
          placeholder={{ label: 'Select a Category', value: null, color: 'lightgray' }}
          items={type === 'expense' ? expenseCategories : incomeCategories}
          value={category}
          style={
            Platform.OS === 'web'
              ? { inputWeb: styles.inputWeb }
              : { inputAndroid: styles.inputAndroid, inputIOS: styles.inputIOS }
          }
        />
        )}

        {/* Date picker */}
        {selectedDate == null && (
          <CustomButton buttonText="Select Date" onPress={showDatePicker} bgColor='#fae6f0' textColor='black'/>
        )}

        {isDatePickerVisible && ( <DateTimePicker
        value={selectedDate || new Date()}
        display='default'
        mode='date'
        onChange={onChange}
        />)}

        {(isDatePickerVisible && selectedDate) && (
        <CustomInput placeholder='Date selected: ' 
          value={new Date(selectedDate).toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
          })} 
          editable={false}
          style={styles.disabledInput}
        />
        )}

        <CustomButton buttonText="Update" onPress={handleUpdate}/>
        <CustomButton buttonText="Cancel" onPress={handleGoBack} bgColor={"white"} textColor={'black'}/>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewCont: {
    paddingTop: 30,
  },  
  backButton: {
    alignSelf: 'flex-start', // Ensures button hugs the left
    marginBottom: 10,
    paddingLeft: 0,
  },
  backButtonContent: {
  flexDirection: 'row',
  alignItems: 'center',
  },
  backButtonLabel: {
  fontSize: 20,
  color: '#4B0082', // optional: dark indigo or your brand color
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 12,
  },
  inputWeb:{
    fontSize: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: '#9370DB',
    borderRadius: 6,
    backgroundColor: '#f3f3fd',
    margin: 12,
    color: 'black',
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#9370DB',
    borderRadius: 4,
    color: 'black',
    margin: 12,
    backgroundColor: '#f3f3fd',
},
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#9370DB',
    borderRadius: 4,
    color: 'black',
    margin: 12,
    backgroundColor: '#f3f3fd',
  },
  disabledInput: {
  backgroundColor: 'gray',
  color: 'gray',
}  
})