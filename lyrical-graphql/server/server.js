const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');

require('dotenv').config();
const app = express();

// Replace with your mongoLab URI
const MONGO_URI = `mongodb://${process.env.DB_USER}:${process.env.DB_PW}@ds153978.mlab.com:53978/graphql-lyrical-db`;
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, { useMongoClient: true })
  .then(() => console.log('Database connected successfully.'))
  .catch(err => console.log('Error connecting to database: ' + err.message))

app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
