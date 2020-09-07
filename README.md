## PubSub table project

This project shows a list of 100 cities that updates every few seconds from a bigger size pool.

## How to start the project
The project comes with a front and a back folder for each part of the application.

In ./back, run :
```sh
$ npm install
$ npm start
```

In ./front, run :
```sh
$ yarn 
$ yarn start
```

If you want to bundle the front app, n ./front run:
```sh
$ yarn build
```
The bundled app will be in the ./front/build folder

IMPORTANT NOTE:
This app uses google maps, in order to work properly you shoul add a .env file that contains:

```sh
REACT_APP_GOOGLE_MAPS_KEY=$yourGoogleApiKey
```


