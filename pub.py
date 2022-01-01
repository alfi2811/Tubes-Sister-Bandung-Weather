# import paho mqtt
import paho.mqtt.client as mqtt
# import time untuk sleep()
import time
# import datetime untuk mendapatkan waktu dan tanggal
from datetime import datetime

# buat callback on_publish untuk publish data
########################################
def on_publish(client, userdata, message):
  print("publishing message data ke-", message)
  pass

########################################

# definisikan nama broker yang akan digunakan
broker_address = "localhost"
# buat client baru bernama P2
print("creating new instance")
client = mqtt.Client("P2")
# kaitkan callback on_publish ke client
client.on_publish = on_publish
# lakukan koneksi ke broker
print("connecting to broker")
client.connect(broker_address, port=8000)

# mulai loop client
client.loop_start()
# lakukan 20x publish waktu dengan topik "waktu"
for i in range (20):
  # sleep 1 detik
  time.sleep(1)
  
  # client melakukan publish data dengan topik "waktu"
  print("Publishing message to topic", "waktu")
  msg = datetime.now().strftime("%Y-%m-%d, %H:%M:%S")
  client.publish("waktu", msg)
    
#stop loop
client.loop_stop()
