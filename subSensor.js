const mqtt = require('mqtt')
const options = {
  // Clean session
  clean: true,
  connectTimeout: 4000,
  // Auth
  clientId: 'emqx_test',
  username: 'emqx_test',
  password: 'emqx_test',
}
const client  = mqtt.connect('mqtt://broker.emqx.io:1883', options)
client.on('connect', function () {
  console.log('Connected')
  client.subscribe('Suhu1')
  client.subscribe('Suhu2')
  client.subscribe('Suhu3')
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log("masuk")
  console.log(message.toString())
  // client.end()
})