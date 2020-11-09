- For local developement, run **redis-server** at the first place.

- run `node s3_createbucket.js BUCKET_NAME` to create s3 bucket

- Running Docker in window, ` docker-machine ip default` to get windows port, https://stackoverflow.com/questions/44014698/docker-failed-to-connect-to-localhost-port-4000-connection-refused

- ` "dev": "concurrently --kill-others-on-fail \"npm run server\" \"npm run client\"",`
