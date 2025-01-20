from pymongo import MongoClient

def get_db():
    client = MongoClient("mongodb://localhost:27017/")
    db = client.reporting      # conntecing to the reporting database.
    return db