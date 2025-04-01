import express from 'express'
import { encontrarPorId, enviarDinero } from '../database/db.js'

const transferirRuta = express.Router({ mergeParams: true })

transferirRuta.param('desde', (req, res, next, id) => {
    const desdeId = Number(id)
    const sobreDesde = encontrarPorId(desdeId)
    if (sobreDesde) {
        req.desdeId = desdeId
        req.sobreDesde = sobreDesde
        next()
    } else {
        const error = new Error("No existe el sobre desde")
        error.status = 400
        next(error) 
    }
})

transferirRuta.param('para', (req, res, next, id) => {
    const paraId = Number(id)
    const sobrePara = encontrarPorId(paraId)
    if (sobrePara) {
        req.paraId = paraId
        req.sobrePara = sobrePara
        next() 
    } else {
        const error = new Error("No existe el sobre para")
        error.status = 400
        next(error) 
    }
})

transferirRuta.get('/', (req, res) => {
    res.send("Estamos en ello guapo!")
})

transferirRuta.post('/:desde/:para', (req, res) => {
    try {
        res.status(201).send(enviarDinero(req.desdeId, req.paraId, req.body.cantidad))
    } catch (error) {
        res.status(error.status || 404).send({ error: error.message })
    }
})

export default transferirRuta