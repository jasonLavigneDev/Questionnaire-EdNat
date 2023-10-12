#!/bin/sh
python3 /dataSuppressor/purgeData.py
crond -f -L /dataSuppressor/purgeData.log