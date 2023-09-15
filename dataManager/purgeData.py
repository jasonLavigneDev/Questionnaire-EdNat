import os
from pymongo import MongoClient
from dotenv import load_dotenv
from datetime import datetime, date, timedelta


load_dotenv()


MONGO_URI = os.getenv("MONGO_URI")
MONGO_DATABASE = os.getenv("MONGO_DATABASE")
DAYS_BEFORE_EXPIRATION = os.getenv("DAYS_BEFORE_EXPIRATION")


def get_database():
    client = MongoClient(MONGO_URI)
    return client[MONGO_DATABASE]


def purgeData():
    print("=====Starting deletion of expired data=====")
    today = datetime.today() + timedelta(days=2)
    data = db['forms'].find({"formAnswers": {"$exists": True}})
    for form in data:
        date = form["expirationDate"]
        if(today > date):
            print("Remove answers of form: ", form['title'])
            db['forms'].update_one({"_id": form["_id"]}, {
                "$set": {"formAnswers": []}})
    print("====Ending deletion of expired data====")


db = get_database()
purgeData()
