import express from 'express'
import { todosLosSobres, encontrarPorId, crearSobre, actualizarSobre, eliminarSobre } from '../database/db.js'
import transferirRuta from './transfer.js'

const sobresRuta = express.Router()

sobresRuta.use('/transferir', transferirRuta)

sobresRuta.param('id', (req, res, next, id) => {
    const sobreId = Number(id)
    const sobre = encontrarPorId(sobreId)
    if (sobre) {
        req.sobreId = sobreId
        req.sobre = sobre
        next()
    }
})

sobresRuta.get('/', (req, res) => {
    res.send(todosLosSobres)
})

sobresRuta.get('/:id', (req, res) => {
    res.send(req.sobre)
})

sobresRuta.post('/', (req, res) => {
    crearSobre(req.body.nombre, Number(req.body.presupuesto))
    res.status(201).send(todosLosSobres)  
})

sobresRuta.put('/:id', (req, res) => {
    actualizarSobre(req.sobreId, req.body)
    res.status(200).send(todosLosSobres)
})

sobresRuta.delete('/:id', (req, res) => {
    eliminarSobre(req.sobreId)
    res.status(204).send(todosLosSobres)
})

export default sobresRuta