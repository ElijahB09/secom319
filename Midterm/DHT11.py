import requests
import base64
import time
import board
import adafruit_dht
import json
from datetime import datetime

dhtDevice = adafruit_dht.DHT11(board.D4)
api_url = "https://api.github.com/repos/ElijahB09/secom319/contents/Midterm/data.json"
access_token = "<secret here>"
headers = {
    "Authorization": f"Bearer {access_token}",
    "User-Agent": "SeComs319Midterm"
}

while True:
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
    response = requests.get(api_url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        decoded_content = base64.b64decode(data["content"]).decode("utf-8")
        # Modify the JSON data as needed
        current_content = json.loads(decoded_content)
        current_content["newField"] = "newData"
        
        # Encode the JSON content to bytes
        updated_content_bytes = json_string.encode("utf-8")

        # Encode the bytes to Base64
        updated_content_base64 = base64.b64encode(updated_content_bytes).decode()
        
        # Create a payload for the PATCH request
        payload = {
            "message": "Update JSON data",
            "content": updated_content_base64.decode(),
            "sha": data["sha"],  # SHA of the current content
        }

        # Make a PATCH request to update the file
        response = requests.put(api_url, headers=headers, json=payload)

        if response.status_code == 200:
            print("JSON file updated successfully.")
        else:
            print(f"Failed to update the JSON file: {response.status_code} - {response.text}")

    else:
        print(f"Failed to fetch the JSON file: {response.status_code} - {response.text}")
    time.sleep(600.0)