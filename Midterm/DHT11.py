import time
import board
import adafruit_dht
import os
import json
from datetime import datetime

dhtDevice = adafruit_dht.DHT11(board.D4)

f = open(os.path.dirname(os.path.abspath(__file__)) + "/data.json", "w")
json_objs = []
x = 0

while (x < 10):
    try:
        temperature_c = dhtDevice.temperature
        temperature_f = temperature_c * (9 / 5) + 32
        humidity = dhtDevice.humidity
        current_dateTime = datetime.now()
        json_object = {"time": f"{current_dateTime}", "temperature_c": temperature_c, "temperature_f": temperature_f, "humidity": humidity}
        json_objs.append(json_object)
        print("{{ \"time\":\"{}\",\"temperature_c\":{:.2f},\"temperature_f\":{:.2f}, \"humidity\":{} }}".format(current_dateTime, temperature_c, temperature_f, humidity))
    except RuntimeError as error:
        print(error.args[0])
    time.sleep(5.0)
    x = x + 1
json_data = {"data": json_objs}
json_string = json.dumps(json_data, indent=4)
f.write(json_string)
f.close()