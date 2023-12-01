# No Meta Chat

This is a chat application made with Next, NodeJS, Socket.io and MongoDB.

## Setup

To run this application you need to have docker, docker-compose and node installed.
If you don't have docker and docker-compose installed, you can follow the instructions [here](https://docs.docker.com/get-docker/) and [here](https://docs.docker.com/compose/install/).
If you don't have node installed, you can follow the instructions [here](https://nodejs.org/en/download/).

1. Clone the repository
2. Create a `.env` file in the backend folder and add the following variables:

```
MONGO_INITDB_ROOT_USERNAME=yourMongoUsername
MONGO_INITDB_ROOT_PASSWORD=yourMongoPassword
MONGO_INITDB_DATABASE=yourMongoDatabase
MONGO_URI=localhost
MONGO_PORT=27017
```

## Running the application

1. Run `docker-compose up` in the backend folder
2. Run `npm install` in the backend and frontend folders
3. Run `npm run start` in the backend and frontend folders
4. Open `http://localhost:3000` in your browser
