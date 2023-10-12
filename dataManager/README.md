### Description

The script allows deletion of data in forms, by checking expiration date of answers of form.
It is better to use the script with a cron


### Install

requirements.txt contains all import necessary for scripts to work.

```pip install -r requirements.txt```

The script needs a well formed .env file.
- MONGO_URI: URI of mongo database
- MONGO_DATABASE: name of mongo database


The script also requires an active LaBoite setup.


### Usage

python3 purgeDate.py