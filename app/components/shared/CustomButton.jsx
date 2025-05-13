import { StyleSheet, Text, Pressable } from 'react-native';
import React from 'react'

export default function CustomButton({onPress, buttonText, type='PRIMARY', bgColor, textColor}) {
  return (
    <Pressable style={[styles.container, styles[`container_${type}`], bgColor ? {backgroundColor: bgColor}: {}]} onPress={onPress}>
      <Text style={[styles.text, textColor ? {color: textColor}: {}]}>{buttonText}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container: { 
        // width: '100%',
        padding: 15,
        marginVertical: 5,
        borderRadius: 5,
        margin: 12,
    },
    text: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white'
    },
    container_PRIMARY: {backgroundColor: 'purple'},
});