import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import { env } from 'process'
import sobresRuta from './src/routes/envelopes.js'

const app = express()
const PORT = env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send("Hola mundo!")
})

app.use('/envelopes', sobresRuta)

app.listen(PORT, () => {
    console.log(`El servidor está funcionando en el puerto ${PORT}`)
})