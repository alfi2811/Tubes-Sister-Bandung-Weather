console.log(mqtt)
const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)
var weatherList = {};
const host = 'ws://broker.emqx.io:8083/mqtt'

const options = {
  keepalive: 60,
  clientId: clientId,
  protocolId: 'MQTT',
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  will: {
    topic: 'WillMsg',
    payload: 'Connection Closed abnormally..!',
    qos: 0,
    retain: false
  },
}

console.log('Connecting mqtt client')
const client = mqtt.connect(host, options)

client.on('error', (err) => {
  console.log('Connection error: ', err)
  client.end()
})

client.on('reconnect', () => {
  console.log('Reconnecting...')
})
client.on('connect', () => {
  console.log('Client connected:' + clientId)
  // Subscribe
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
  const tableref = document.getElementById('sensor-data').getElementsByTagName('tbody')[0];      
  const tablerow = tableref.insertRow(0)      
  tablerow.className = 'fade-in'
  tablerow.innerHTML = `<tr class=fade-in> <td>${data.date}</td> <td>${data.id}</td><td>${data.device_name}</td> <td>${data.suhu}</td> </tr>`
  // document.getElementById('anjay').innerHTML = `${data.device_name} ${data.date} Suhu ${data.suhu}`;
  updateWeather(data);
})
function updateWeather(data){  
  if(weatherList[data.id] != null){
    weatherList[data.id].total += data.suhu
    weatherList[data.id].count++
    if(weatherList[data.id].count == 3){
      var mydate = new Date(data.date);
      console.log(mydate.toLocaleTimeString());
      document.getElementById('time-now').innerHTML = mydate.toLocaleTimeString();
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

function getImgCloud(id) {
  var searchPic = document.getElementById('img-icon');
  if(getWeatherNow(id) > 27) {
    searchPic.src = "../assets/sunny.png";
  } else if (getWeatherNow(id) > 20) {
    searchPic.src = "../assets/cloudy.png";
  } else {
    searchPic.src = "../assets/rainy.png";
  }  
}

function viewUpdate(id){
  getImgCloud(id);
  document.getElementById('avg-now').innerHTML = getWeatherNow(id) + " &#8451;";
  document.getElementById('avg-all').innerHTML = getAvg() + " &#8451;";
  document.getElementById('total-data').innerHTML = Object.keys(weatherList).length;
  
  // console.log("Rata-rata keseluruhan suhu: ", getAvg() + " degree")
  // console.log("Jumlah Data yang dikumpulkan : ", Object.keys(weatherList).length)  
}