const { createClient } = require('redis')

const client = createClient()
const connetRedis = (async () => {
  client.on('error', (err) => {
    console.log(err.message)
  })
  
  await client.connect()
  console.log('Redis connected')
  return client
})()


module.exports = client