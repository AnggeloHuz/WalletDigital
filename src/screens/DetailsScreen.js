import React from 'react';
import { Text, Button, StyleSheet, View } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper.js';

const DetailsScreen = ({ navigation }) => {
  return (
    <ScreenWrapper
      // 1. Desactivamos translucidez para que el sistema empuje el contenido hacia abajo
      translucent={false}
    >
      <View style={styles.container}>
        <Text style={styles.text}>
          ¡Ahora el Header respeta el área segura!
        </Text>
        <Button title="Volver atrás" onPress={() => navigation.goBack()} />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center'
  }
});

export default DetailsScreen;