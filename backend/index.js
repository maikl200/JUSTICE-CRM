const app = require('./app')
const port = process.env.PORT || 5100

app.listen(port, () => console.log(`good ${port} started`))