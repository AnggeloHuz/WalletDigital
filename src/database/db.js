import * as SQLite from 'expo-sqlite';

// 1. Abrir la conexión (crea el archivo si no existe)
const db = SQLite.openDatabaseSync('mi_app_db.db');

// --- CREACIÓN DE TABLAS ---
export const initDatabase = () => {
  try {
    // execSync es ideal para crear tablas rápidamente
    db.execSync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT
      );
    `);
    console.log('Tabla creada correctamente');
  } catch (error) {
    console.error('Error al crear tabla:', error);
  }
};

// --- INSERTAR DATOS (Minimal) ---
export const addUser = (name, email) => {
  try {
    // runSync ejecuta comandos que no devuelven datos (INSERT, UPDATE, DELETE)
    const result = db.runSync(
      'INSERT INTO users (name, email) VALUES (?, ?)', 
      [name, email] // Usamos '?' para prevenir inyecciones SQL automáticamente
    );
    return result.lastInsertRowId; // Retorna el ID del nuevo usuario
  } catch (error) {
    console.error('Error al insertar:', error);
  }
};

// --- CONSULTAR DATOS (Minimal) ---
export const getUsers = () => {
  try {
    // getAllSync trae todos los registros como un array de objetos JavaScript
    const allRows = db.getAllSync('SELECT * FROM users');
    return allRows; 
  } catch (error) {
    console.error('Error al consultar:', error);
    return [];
  }
};