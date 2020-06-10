const { body, validationResult } = require('express-validator')

/*
 * Middlewares that wraps validator.js  and sanitize function . 
 * Use to ensure every input are validated and returning an error 
 * if the input not pass the validation .
 */

const addTransactionRecord = () => {
  return [
    body('date').notEmpty().withMessage('Date required!').isISO8601().withMessage('Incorrect month format!'),
    body('total').notEmpty().withMessage('Total required!').isNumeric().withMessage('Incorrect total type!!'),
    body('transactionType').notEmpty().withMessage('Transaction type required!'),
  ]
}

const editTransactionRecord = () => {
  return [
    body('total').notEmpty().withMessage('Total required!').isNumeric().withMessage('Incorrect total type!!'),
    body('transactionType').notEmpty().withMessage('Transaction type required!'),
  ]
}

const searchRecord = () => {
  return [
    body('startDate').notEmpty().withMessage('After Date required!').isISO8601().withMessage('Incorrect date format!'),
    body('endDate').notEmpty().withMessage('End Date required!').isISO8601().withMessage('Incorrect date format!'),
  ]
}

const addRecurringPayment = ()=> {
  return [
    body('total').notEmpty().withMessage('Total required!').isNumeric().withMessage('Incorrect total type!!'),
    body('subscriptionName').notEmpty().withMessage('Subscription Name required!')
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  addTransactionRecord,
  editTransactionRecord,
  addRecurringPayment,
  searchRecord,
  validate,
}