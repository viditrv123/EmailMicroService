'use strict'

import express from 'express'
import cors from 'cors'
import router from './routes'

const app = express()
app.use(express.json())
app.use(cors())
app.set('view engine', 'ejs')

const port = 2000

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})

app.use('/', router)
