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
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.name[0]}</Text>
      </View>
      <View>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
      </View>
    </View>
  );

  return (
    <ScreenWrapper>
      <View style={styles.mainContainer}>
        
        {/* --- FORMULARIO DE INGRESO --- */}
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Agregar Usuario</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <Button title="Guardar en SQLite" onPress={handleAddUser} />
        </View>

        {/* --- LISTA VISUAL --- */}
        <Text style={styles.subtitle}>Lista de Usuarios ({users.length})</Text>
        
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()} // Clave única para React
          renderItem={renderUserItem}
          contentContainerStyle={styles.listContent}
          // Mensaje si la lista está vacía
          ListEmptyComponent={
            <Text style={styles.emptyText}>No hay usuarios aún.</Text>
          }
        />

        {/* Botón de navegación original */}
        <View style={styles.footer}>
          <Button
            title="Ir a Detalles"
            onPress={() => navigation.navigate('Detalles')}
            color="#666"
          />
        </View>

      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 16,
  },
  // Estilos del Formulario
  inputContainer: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  // Estilos de la Lista
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#555',
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    // Sombra suave (Shadow)
    elevation: 2, // Android
    shadowColor: '#000', // iOS
    shadowOffset: { width: 0, height: 1 }, // iOS
    shadowOpacity: 0.1, // iOS
    shadowRadius: 2, // iOS
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
    fontStyle: 'italic',
  },
  footer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  }
});

export default HomeScreen;