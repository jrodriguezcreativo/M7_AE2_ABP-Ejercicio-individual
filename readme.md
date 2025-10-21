# M7_AE2_ABP-Ejercicio individual

## Gestión de Productos — Node.js + PostgreSQL

### Descripción
Proyecto individual que implementa una pequeña API en **Node.js con Express** para gestionar productos de una tienda usando **PostgreSQL**.  
Los productos tendrán atributos como nombre, precio, categoría y stock. El objetivo es practicar consultas con `pg`, consultas parametrizadas, validación básica y medidas para evitar SQL Injection.

### Objetivos
- Configurar un servidor con Express.  
- Conectarse a PostgreSQL usando `pg` y `dotenv`.  
- Crear un Pool de conexiones y usar consultas parametrizadas.  
- Implementar rutas para SELECT, INSERT, UPDATE y DELETE.  
- Aplicar validación básica de parámetros y evitar SQL Injection.  

### Tecnologías
- Node.js  
- Express  
- PostgreSQL  
- dotenv  

### Estructura del proyecto
```
M7_AE2_ABP-Ejercicio individual
|-- db
  |-- pool.js
|-- routes
  |-- productos.js
|-- .env
|-- .env.example
|-- .gitignore
|-- server.js
|-- package.json
|-- readme.md
```

### Configuración de la base de datos
```sql
-- Crear base de datos
CREATE DATABASE tienda_db;

-- Conectarse a la base de datos
\c tienda_db;

-- Crear tabla productos
CREATE TABLE productos (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  precio DECIMAL NOT NULL,
  categoria TEXT,
  stock INT
);

-- Insertar registros de ejemplo
INSERT INTO productos (nombre, precio, categoria, stock) VALUES
('Camiseta deportiva', 19.99, 'Ropa', 50),
('Auriculares inalámbricos', 79.90, 'Electrónica', 20),
('Taza cerámica', 7.50, 'Hogar', 100);
```
***Crear un archivo .env en la raíz del proyecto con las credenciales de conexión a PostgreSQL:***
```
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tienda_db
```
### Instrucciones básicas
1. Ejecutar `npm install` para instalar dependencias.
2. Crear el archivo `.env` con las credenciales.
3. Crear la base de datos y la tabla productos (usar el script SQL).
4. Arrancar el servidor con `node server.js` o `npm run dev` dev si usas `nodemon`.
5. Probar las rutas desde Postman o el navegador.
### Autor
**Jorge Rodriguez**