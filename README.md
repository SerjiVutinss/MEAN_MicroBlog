# MEAN Micro Blog

MEAN stack micro-blog application with user authentication using passport.js

Don't forget to check the [Wiki](https://github.com/SerjiVutinss/ng-mean-auth/wiki/NG-MEAN-AUTH)

## Server

1. Rename `database.sample.js` to `database.js` and enter Mongo/mLab connection string in `database` export.
2. `npm install` to install backend dependencies
3. `npm start` to run the server
  - Alternatively, `npm run dev` will run the server with live reload - `nodemon` must be installed globally for this to work (`npm install -g nodemon`)

## Client
1. `cd client`
2. `npm install` to install client dependencies
3. `npm start`

* **Note:** Since proxying is used, `ng serve` will run the application but API calls will fail
