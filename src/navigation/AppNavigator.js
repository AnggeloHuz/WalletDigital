import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// Importamos el TabNavigator en lugar de HomeScreen directo
import TabNavigator from './TabNavigator'; 
import DetailsScreen from '../screens/DetailsScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Principal">
        
        {/* La pantalla principal ahora contiene los TABS.
           Ponemos headerShown: false porque los tabs ya tienen su propia barra arriba 
           o queremos controlarlo dentro.
        */}
        <Stack.Screen 
          name="Principal" 
          component={TabNavigator} 
          options={{ headerShown: false }} 
        />

        {/* La pantalla Detalles se queda en el Stack.
           Esto significa que cuando navegues a ella, TAPARÁ los tabs.
        */}
        <Stack.Screen 
          name="Detalles" 
          component={DetailsScreen} 
          options={{ title: 'Detalle del Item' }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;