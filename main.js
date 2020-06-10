const serverless = require('serverless-http');
const express = require('express');
const app = express();
const transaction = require('./api/controller/transaction');
const recurringPayment = require('./api/controller/recurringPayment');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/transaction-record', transaction);
app.use('/api/recurring-payment', recurringPayment);

module.exports.handler = serverless(app);