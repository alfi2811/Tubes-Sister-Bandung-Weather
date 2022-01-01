# import paho mqtt
import paho.mqtt.client as mqtt 
# import time for sleep()
import time

# buat callback on_message; jika ada pesan
# maka fungsi ini akan dipanggil secara asynch
########################################
def on_message(client, userdata, message):
    print("message data received,", str(message.payload.decode("utf-8")))
    pass
    
broker_address = "broker.emqx.io"
print("creating new instance")
client = mqtt.Client("P1")

client.on_message = on_message

client.connect(broker_address, port=1883)
client.loop_start()

print("Subscribing to topic:", "waktu")
while True:    
    client.subscribe("Suhu1")
    client.subscribe("Suhu2")
    client.subscribe("Suhu3")    
    time.sleep(1)
       
#stop loop
client.loop_stop()