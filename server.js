const express = require('express')
const app = express()
const productosRoutes = require('./routes/productos')
const PORT = process.env.PORT || 3000

require('dotenv').config()
app.use(express.json())

app.use('/productos', productosRoutes)

app.get('/', (req, res) => {
  res.send('API de gestión de productos — Node.js + PostgreSQL')
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
