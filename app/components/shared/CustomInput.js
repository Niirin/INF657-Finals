import { StyleSheet, TextInput } from 'react-native';
import React from 'react';

export default function CustomInput({placeholder, value, setValue, secureTextEntry}) {
  return (
    <TextInput 
    style={styles.input}
    placeholder={placeholder}
    onChangeText={setValue}
    value={value}
    secureTextEntry={secureTextEntry}>
    </TextInput>
  )
}

const styles = StyleSheet.create({
    input: {
        height: 60,
        margin: 12,
        borderWidth: 1,
        // width: '100%',
        padding: 20,
        borderColor: '#9370DB',
        borderBottomColor: 'black' 
    }
})