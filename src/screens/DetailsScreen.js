import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DetailsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Aquí están los detalles...</Text>
      <Button
        title="Volver atrás"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0e0e0', // Cambié el color para que se note la diferencia
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  }
});

export default DetailsScreen;