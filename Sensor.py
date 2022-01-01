# import paho mqtt
import paho.mqtt.client as mqtt
# import time untuk sleep()
import time
import datetime
import random as rand
import json
import uuid


# buat callback on_publish untuk publish data
########################################
def on_publish(client, userdata, message):
  print("publishing message data ke-", message)
  pass

########################################

# definisikan nama broker yang akan digunakan
broker_address = "broker.emqx.io"
# buat client baru bernama P2
print("creating new instance")
Sensor1 = mqtt.Client("P2")
Sensor2 = mqtt.Client("P3")
Sensor3 = mqtt.Client("P4")

# kaitkan callback on_publish ke client
Sensor1.on_publish = on_publish
Sensor2.on_publish = on_publish
Sensor3.on_publish = on_publish
# lakukan koneksi ke broker
print("connecting to broker")
Sensor1.connect(broker_address,port=1883)
Sensor2.connect(broker_address,port=1883)
Sensor3.connect(broker_address,port=1883)
# lakukan 20x publish waktu dengan topik "waktu"
while True:
  
  # client melakukan publish data dengan topik "waktu"
  uuidNum = uuid.uuid1()
  msg1 = rand.randint(15,30)
  print("Publishing message to topic", "Suhu1")
  waktu1 = datetime.datetime.now()
  Sensor1.publish("Suhu1",json.dumps({
    "id": str(uuidNum),
    "device_name":"Sensor 1",
    "date":waktu1.strftime("%m/%d/%Y, %H:%M:%S"),
    "suhu":msg1
  })  )
  
  msg2 = rand.randint(15,30)
  print("Publishing message to topic", "Suhu2")
  waktu2 = datetime.datetime.now()
  Sensor2.publish("Suhu2", json.dumps({
    "id": str(uuidNum),
    "device_name":"Sensor 2",
    "date":waktu2.strftime("%m/%d/%Y, %H:%M:%S"),
    "suhu":msg2
  }) )

  msg3 = rand.randint(15,30)
  print("Publishing message to topic", "Suhu3")
  waktu3 = datetime.datetime.now()
  Sensor3.publish("Suhu3",json.dumps({
    "id": str(uuidNum),
    "device_name":"Sensor 3",
    "date":waktu3.strftime("%m/%d/%Y, %H:%M:%S"),
    "suhu":msg3
  }) )

  time.sleep(10)