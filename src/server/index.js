const Koa = require('koa');
const logger = require('koa-logger');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const todos = require('./todos/routes');
require('dotenv').config();

const port = process.env.PORT || 9000;

const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(logger());

app.use(todos.routes());
app.use(todos.allowedMethods());

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useFindAndModify: false
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.on('error', err => {
  console.log('Error', err);
});
