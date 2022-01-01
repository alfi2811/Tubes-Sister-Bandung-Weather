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
    
########################################
    
# buat definisi nama broker yang akan digunakan
broker_address = "localhost"
# buat client baru bernama P1
print("creating new instance")
client = mqtt.Client("P1")
# kaitkan callback on_message ke client
client.on_message = on_message
# buat koneksi ke broker
print("connecting to broker")
client.connect(broker_address, port=8000)
# jalankan loop client
client.loop_start()

# print topik yang disubscribe (dalam konteks ini, "waktu")
print("Subscribing to topic:", "waktu")
# loop forever
while True:
    # client melakukan subscribe ke topik "waktu"
    client.subscribe("waktu")
    # berikan waktu tunggu 1 detik 
    time.sleep(1)
       
#stop loop
client.loop_stop()