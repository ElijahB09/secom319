import requests
import base64
import time
import board
import adafruit_dht
import json
from datetime import datetime
from dotenv import load_dotenv
import os
from supabase import create_client, Client
# Remember to Pip install supabase

load_dotenv()

dhtDevice = adafruit_dht.DHT11(board.D4)
supabase_key = os.getenv("SUPABASE_KEY")
supabase_url = "https://onugnjxbswcerfbwsmqb.supabase.co"
supabase: Client = create_client(supabase_url, supabase_key)

room_num = 1
room, count = supabase.table('rooms').select('*').eq('room_num', room_num).execute()

while True:
    # Read temperatures only once
    try:
        temperature_c = dhtDevice.temperature
        temperature_f = temperature_c * (9 / 5) + 32
        humidity = dhtDevice.humidity
        print("{{\"temperature_f\":{:.2f}, \"humidity\":{} }}".format(temperature_f, humidity))

    except RuntimeError as error:
        print(error.args[0])
    time.sleep(600.0)