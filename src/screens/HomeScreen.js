import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';

// Importamos nuestras funciones de base de datos
import { initDatabase, addUser, getUsers } from '../database/db';

const HomeScreen = ({ navigation }) => {
  // 1. Estados para manejar los inputs y la lista
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);

  // 2. Efecto inicial: Crea la tabla y carga los datos existentes
  useEffect(() => {
    initDatabase(); // Asegura que la tabla exista
    loadUsers();    // Carga los usuarios guardados
  }, []);

  // Función para obtener usuarios de la BD y actualizar el estado
  const loadUsers = () => {
    const dbUsers = getUsers();
    setUsers(dbUsers);
  };

  // Función para guardar un nuevo usuario
  const handleAddUser = () => {
    if (name.trim() === '' || email.trim() === '') {
      alert('Por favor escribe nombre y email');
      return;
    }

    // Insertamos en la BD
    addUser(name, email);
    
    // Limpiamos los inputs
    setName('');
    setEmail('');
    
    // Recargamos la lista para ver el cambio inmediato
    loadUsers();
  };

  // 3. Renderizado de cada item de la lista (Tarjeta de usuario)
  const renderUserItem = ({ item }) => (
    // USANDO TAILWIND: Flex row, fondo blanco, padding 3, borde redondeado, margen abajo
    <View className="flex-row items-center bg-white p-3 mb-2 rounded-lg shadow-sm">
      <View className="w-10 h-10 rounded-full bg-blue-500 justify-center items-center mr-3">
        <Text className="text-white font-bold text-lg">{item.name[0]}</Text>
      </View>
      <View>
        <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
        <Text className="text-sm text-gray-500">{item.email}</Text>
      </View>
    </View>
  );

  return (
    <ScreenWrapper>
      <View className="flex-1 p-4 bg-gray-50"> {/* Fondo gris suave */}
        
        {/* Input Container */}
        <View className="mb-5 bg-white p-4 rounded-xl border border-gray-200">
          <Text className="text-xl font-bold mb-3 text-gray-800">Agregar Usuario</Text>
          
          <TextInput
            className="border border-gray-300 p-3 rounded-lg mb-3 bg-gray-50"
            placeholder="Nombre"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            className="border border-gray-300 p-3 rounded-lg mb-3 bg-gray-50"
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          {/* Nota: Los botones nativos (Button) no aceptan className. 
              Para estilizarlos, es mejor usar TouchableOpacity */}
          <Button title="Guardar" onPress={handleAddUser} />
        </View>

        <Text className="text-lg font-semibold mb-2 text-gray-600">
          Lista de Usuarios ({users.length})
        </Text>
        
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderUserItem}
          contentContainerStyle={{ paddingBottom: 20 }} // FlatList a veces requiere style puro para el contentContainer
        />

      </View>
    </ScreenWrapper>
  );
};

export default HomeScreen;