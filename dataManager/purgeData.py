import os
from pymongo import MongoClient
from dotenv import load_dotenv
from datetime import datetime, date, timedelta
import time


load_dotenv()


MONGO_URI = os.getenv("MONGO_URI")
MONGO_DATABASE = os.getenv("MONGO_DATABASE")


def get_database():
    client = MongoClient(MONGO_URI)
    return client[MONGO_DATABASE]


def purgeData():
    start = time.time()
    print("=====Starting deletion of expired data=====")
    today = datetime.today()
    result = db['forms'].update_many({"$and": [{"formAnswers": {"$exists": True}}, {
        "expirationDate": {"$lte": today}}]}, {"$set": {"formAnswers": []}})
    print("Match count:", result.matched_count)
    print("Modified count:", result.modified_count)
    end = time.time()
    elapsed = end - start
    print("====Ending deletion of expired data ({time} ms.)====".format(
        time=round(elapsed, 4)))


db = get_database()
purgeData()
