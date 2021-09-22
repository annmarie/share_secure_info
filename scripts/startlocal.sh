#!/bin/bash

docker build -t share_secure_info ..
docker run -p 3000:3000 -t share_secure_info
