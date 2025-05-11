import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React from 'react'

const Card = ({ children, style, onPress }) => {
  const Wrapper = onPress ? TouchableOpacity: View;

  return (
    <Wrapper style={[styles.card, style]}>{children}</Wrapper>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 10,
    margin: 10,
    shadowColor: "#483d8b",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5
  }
});

export default Card;