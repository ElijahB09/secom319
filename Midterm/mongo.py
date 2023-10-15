from pymongo import MongoClient

try:
    conn = MongoClient()
    print("Connected successfully!")
except:
    print("Could not connect to MongoDB")

db = conn.database

collection = db.my_gfg_collection

emp_rec1 = {
    "date":"2023-05-04 22:27:31.573920",
    "temperature_c":23.00,
    "temperature_f":73.40,
    "humidity":30
}

rec_id1 = collection.insert_one(emp_rec1)

print("Data inserted with record ids", rec_id1, " ", rec_id2)

cursor = collection.find()
for record in cursor:
    print(record)