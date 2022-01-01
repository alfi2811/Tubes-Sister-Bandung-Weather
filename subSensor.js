const mqtt = require('mqtt')
var weatherList = {};
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
  // console.log(message.toString())
  // client.end()
  data = JSON.parse(message)
  console.log(`${data.device_name} ${data.date} Suhu ${data.suhu}`)  
  updateWeather(data)
})

function updateWeather(data){  
  if(weatherList[data.id] != null){
    weatherList[data.id].total += data.suhu
    weatherList[data.id].count++
    if(weatherList[data.id].count == 3){
      viewUpdate(data.id)
    }
  }else{
      weatherList[data.id] = {total:0,count:0}
      weatherList[data.id].total += data.suhu
      weatherList[data.id].count++
  }
}
function getAvg(){
  let numOfData = 0;
  let totalData = 0;
  for (let index = 0; index < Object.keys(weatherList).length; index++) {
      const element = weatherList[Object.keys(weatherList)[index]]
      totalData += element.total
      numOfData += element.count
    }
  return Math.floor(totalData/numOfData)
}

function getWeatherNow(id) {
  return Math.floor(weatherList[id].total / weatherList[id].count)
}

function viewUpdate(id){  
  console.log("Rata-rata suhu: ", getWeatherNow(id) + " degree")
  console.log("Rata-rata keseluruhan suhu: ", getAvg() + " degree")
  console.log("Jumlah Data yang dikumpulkan : ", Object.keys(weatherList).length)  
}