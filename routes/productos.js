const express = require('express')
const router = express.Router()
const pool = require('../db/pool')

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos ORDER BY id')
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' })
  }
})

// Obtener un producto por ID (consulta parametrizada)
router.get('/:id', async (req, res) => {
  const { id } = req.params
  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' })

  try {
    const result = await pool.query('SELECT * FROM productos WHERE id = $1', [id])
    if (result.rows.length === 0) return res.status(404).json({ error: 'Producto no encontrado' })
    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' })
  }
})

// Agregar un nuevo producto
router.post('/', async (req, res) => {
  const { nombre, precio, categoria, stock } = req.body

  if (!nombre || !precio || isNaN(precio)) {
    return res.status(400).json({ error: 'Datos inválidos o incompletos' })
  }

  try {
    const query = 'INSERT INTO productos (nombre, precio, categoria, stock) VALUES ($1, $2, $3, $4) RETURNING *'
    const values = [nombre, precio, categoria || null, stock || 0]
    const result = await pool.query(query, values)
    res.status(201).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto' })
  }
})

// Actualizar un producto
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { nombre, precio, categoria, stock } = req.body

  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' })

  try {
    const query = `
      UPDATE productos
      SET nombre = $1, precio = $2, categoria = $3, stock = $4
      WHERE id = $5
      RETURNING *`
    const values = [nombre, precio, categoria, stock, id]
    const result = await pool.query(query, values)

    if (result.rows.length === 0) return res.status(404).json({ error: 'Producto no encontrado' })
    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' })
  }
})

// Eliminar un producto
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' })

  try {
    const result = await pool.query('DELETE FROM productos WHERE id = $1 RETURNING *', [id])
    if (result.rows.length === 0) return res.status(404).json({ error: 'Producto no encontrado' })
    res.json({ mensaje: 'Producto eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' })
  }
})

module.exports = router
