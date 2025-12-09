import React from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ScreenWrapper = ({ 
  children, 
  style, 
  statusBarColor = 'dark-content', 
  statusBarBg = 'transparent', // Nuevo: Color de fondo de la barra
  translucent = true,          // Nuevo: Por defecto es transparente (moderno)
  edges = ['top', 'bottom', 'left', 'right'] 
}) => {
  return (
    <SafeAreaView style={[styles.container, style]} edges={edges}>
      <StatusBar 
        barStyle={statusBarColor} 
        backgroundColor={statusBarBg} // Usamos el color dinámico
        translucent={translucent}     // Activamos/Desactivamos la superposición
      />
      <View style={styles.content}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  }
});

export default ScreenWrapper;