const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const app = express();
const transaction = require('./api/controller/transaction');
const recurringPayment = require('./api/controller/recurringPayment');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/api/transaction-record', transaction);
app.use('/api/recurring-payment', recurringPayment);

module.exports.handler = serverless(app);