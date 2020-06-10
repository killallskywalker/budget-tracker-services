const express = require('express')
const router = express.Router()
const dbConnection = require('../../connection')
const Transaction = require('../schema/transaction')
const RecurringPayment = require('../schema/recurringPayment')
const { addTransactionRecord,searchRecord,validate } = require('../validation/validator');

/*
 * This is a services to add and delete record of expenses and income . 
 */

router.post('/' , addTransactionRecord() , validate , async (req,res) => {
try{

  await dbConnection.connectToDatabase();

  const month = req.body.date.substring(0, req.body.date.length - 2) + "01";

  const transaction = await Transaction.findTransactionRecord({month:new Date(month).toISOString()});
  if(transaction){
    transaction[0].transaction.push({
        category:req.body.category,
        memo:req.body.memo,
        date:new Date(req.body.date).toISOString(),
        total:req.body.total,
        transactionType:req.body.transactionType
    })
    transaction[0].save();
    }else{
      let recurringPaymentList = await RecurringPayment.findAllRecurringPayment({});
      const newTransaction = new Transaction({
        month:new Date(month).toISOString(),
        recurringPayment:(recurringPaymentList ? recurringPaymentLis[0] : null),
        transaction:{
          category:req.body.category,
          memo:req.body.memo,
          date:new Date(req.body.date).toISOString(),
          total:req.body.total,
          transactionType:req.body.transactionType
        }
    });
    
    await newTransaction.save();

  }
  return res.status(200).json({status:true,message:'Transaction Successful Stored',data:null});
}catch(err){
    res.status(500).json({ message: err.message })
  }
})

router.post('/search-records', searchRecord() , validate ,async (req, res) => {
  try {
    await dbConnection.connectToDatabase()
    let transaction = await Transaction.findTransactionRecord(
      {
        'transaction': {
            $elemMatch: {
                date: {
                    $gte:req.body.startDate,
                    $lte:req.body.endDate
                }
            }
        }
      }
    );
    if(transaction){
      res.status(200).json({status:true,message: "Transaction list successfull retrieved",data:transaction }) 
    }else{
      res.status(404).json({message:'Data not found'});
    }
  } 
  catch (err){
    res.status(500).json({ message: err.message })
  }
})


router.get('/:monthDate', async (req, res) => {
  try {
    console.log(req.params.monthDate.substring(0,8));
    await dbConnection.connectToDatabase()
    let transaction = await Transaction.findTransactionRecord({
      month: {
         $regex: new RegExp(req.params.monthDate.substring(0,8), ''),
      },
    });
    if(transaction){
      res.status(200).json({status:true,message:'Monthly transaction list successfull retrieved',data:transaction});
    }else{
      res.status(404).json({status:false,message:'Data not found'});
    }
  } 
  catch (err){
    res.status(500).json({ message: err.message })
  }
})

router.get('/daily/:id', async (req, res) => {
  try {
    await dbConnection.connectToDatabase()
    let transaction = await Transaction.findDailyTransactionRecord({"transaction._id" :req.params.id},{"transaction.$" : 1});
    if(transaction){
      res.status(200).json({status:true,message:'Daily transaction list successfull retrieved',data:transaction});
    }else{
      res.status(404).json({message:'Data not found'});
    }
  } 
  catch (err){
    res.status(500).json({ message: err.message })
  }
})


router.delete('/:id/:dailyTransactionId',async(req,res) => {
  try{
    await dbConnection.connectToDatabase()
    await Transaction.removeDailyTransactionRecord({_id :req.params.id},{$pull: {'transaction':{_id:req.params.dailyTransactionId}}});
    res.status(204).json({status:true,message: "Transaction record successfully deleted",data:null}) 
  }
  catch(err){
    console.log(err)
    res.status(500).json({ message: err.message })
  }
})

router.put('/:id/:dailyTransactionId',async(req,res) =>{
  try{
    await dbConnection.connectToDatabase()
    const transaction = await Transaction.updateDailyTransactionRecord({'_id':req.params.id,'transaction._id':req.params.dailyTransactionId}, 
    {$set:{
      'transaction.$[].category':req.body.category,
      'transaction.$[].total':req.body.total,
      'transaction.$[].transactionType':req.body.transactionType,
      'transaction.$[].memo':req.body.memo,
    }})
    return res.status(200).json({status:true,message:'Transaction Successful Stored',data:transaction});
  }
  catch(err){
    console.log(err)
    res.status(500).json({ message: err.message })
  }
})

module.exports = router 
