import { StyleSheet, View, TouchableOpacity } from 'react-native';

const Card = ({ children, style, onPress }) => {
  const content = (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );

  return onPress ? (
    <TouchableOpacity onPress={onPress}>
      {content}
    </TouchableOpacity>
  ) : (
    content
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 10,
    margin: 5,
    shadowColor: "#483d8b",
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5
  }
});

export default Card;