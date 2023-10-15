import time
import board
import adafruit_dht
import os
import pymongo
from datetime import datetime
dhtDevice = adafruit_dht.DHT11(board.D4)
while True:
    try:
        client = pymongo.MongoClient("mongodb://localhost:27017/")

        db = client["reactdata"]
        collection = db["pi_data"]

        temperature_c = dhtDevice.temperature
        temperature_f = temperature_c * (9 / 5) + 32
        humidity = dhtDevice.humidity
        current_dateTime = datetime.now()

        newdata = {{ "time":current_dateTime, "temperature_c":format(temperature_c, ".2f"), "temperature_f":format(temperature_f, ".2f"), "humidity":humidity }}
        collection.insert_one(newdata)

        print(mydata["_id"])
        print("{{ \"time\":\"{}\",\"temperature_c\":{:.2f},\"temperature_f\":{:.2f}, \"humidity\":{} }}".format(current_dateTime, temperature_c, temperature_f, humidity))

    except RuntimeError as error:
        print(error.args[0])
    time.sleep(2.0)
