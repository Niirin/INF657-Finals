import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import CustomButton from '../components/shared/CustomButton';
import CustomInput from '../components/shared/CustomInput';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Select from 'react-native-picker-select';

export default function AddTransaction() {
  const navigation = useNavigation();
  const expenseCategories = [
    { label: 'Food&Dining', value: 'food' },
    { label: 'Transportation', value: 'transportation' },
    { label: 'Housing/Rent', value: 'housing' },
    { label: 'Health', value: 'health' },
    { label: 'Shopping', value: 'shopping' },
    { label: 'Entertainment', value: 'entertainment' },
    { label: 'Education', value: 'education' },
    { label: 'Gifts', value: 'gifts' },
    { label: 'Miscellaneous', value: 'miscellaneous' },
    { label: 'Self-care', value: 'self-care' },
  ];

  const incomeCategories = [
    { label: 'Salary', value: 'salary' },
    { label: 'Business', value: 'business' },
    { label: 'Investment', value: 'investment' },
    { label: 'Freelance', value: 'freelance' },
    { label: 'Part-time', value: 'part-time' },
    { label: 'Gifts', value: 'gifts' }
  ]

  //states
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory]= useState('');
  const [selectedDate, setDate]= useState(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const handleGoBack= () => {
    console.log('Back or Cancel pressed');
    navigation.navigate("Home");
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

  const handleSubmit= () => {
    console.log("Submit button pressed");

    if (amount && title && type && category && date ) {
      const transaction = {
          amount, title, type, category, date : selectedDate.toString(),
      };
      console.log(transaction);
      setTitle('');
      setAmount('');
      setType('');
      setCategory(null);
      setDate(null);
    }
    else {
        alert("Please enter all the fields");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewCont} >
        <Button icon="arrow-left" 
        mode="text" 
        onPress={handleGoBack} 
        style={styles.backButton}
        contentStyle={styles.backButtonContent}
        labelStyle={styles.backButtonLabel}
        >
          Back
        </Button>

        <Text style={styles.title}>Add a New Transaction</Text>
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
        {selectedDate && (
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

        <CustomButton buttonText="Submit" onPress={handleSubmit}/>
        <CustomButton buttonText="Cancel" onPress={handleGoBack} bgColor='white' textColor='#000'/>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewCont: {
    paddingTop: 40,
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