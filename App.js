import React from 'react';
// Importamos solo el navegador principal
import AppNavigator from './src/navigation/AppNavigator.js';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    // Envolvemos TODO en el Provider. Esto calcula la geometría de la pantalla.
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}