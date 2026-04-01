from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")

db = client["AI_DB"]
collection = db["chat_history"]