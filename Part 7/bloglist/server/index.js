const express = require('express')
const path = require('path')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const app = express()

const PORT = config.PORT || 3001

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

// Force Express to listen explicitly on IPv4
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})

app.use(express.json())
app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)

// API Routes
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

// serve the built Vite frontend in production and handle client-side routing refreshes
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  })
}

// Keep error handlers at the very bottom
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app