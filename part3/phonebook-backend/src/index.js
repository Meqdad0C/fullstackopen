const config = require('./utils/config')
const app = require('./server')

app.listen(config.PORT, () => {
  console.log(`Server listening on port ${config.PORT}!`)
})
