const jsonServer = require('json-server')


const server = jsonServer.create()
const router = jsonServer.router('db.json')

const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(4000, () => {
  console.log('server is running at the port 4000')
})
