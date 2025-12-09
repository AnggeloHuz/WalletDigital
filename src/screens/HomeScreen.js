import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';

const HomeScreen = ({ navigation }) => {
  return (
    // Reemplazamos <View> por <ScreenWrapper>
    <ScreenWrapper>
      {/* El contenido ahora está seguro y con la barra de estado configurada */}

      {/* Usamos un View interno solo para alinear el contenido de ejemplo */}
      <View style={styles.innerContainer}>
        <Text style={styles.text}>Esta es la Pantalla de Inicio</Text>
        <Button
          title="Ir a Detalles"
          onPress={() => navigation.navigate("Detalles")}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'top',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  }
});

export default HomeScreen;