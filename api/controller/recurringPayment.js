const express = require('express')
const router = express.Router()
const dbConnection = require('../../connection')
const RecurringPayment = require('../schema/recurringPayment')
const { addRecurringPayment,validate } = require('../validation/validator');

/*
 * This is a services to add and delete recurring payment . 
 * If you want to add recurring payment
 * need to set recurring payment first , before add record for income / expense . 
 * If you already add record , the recurring will be calculated for the next month .
 */

router.post('/' , addRecurringPayment() , validate , async (req,res) => {
    try{
        await dbConnection.connectToDatabase();
        const newRecurringPayment = new RecurringPayment({
            total:req.body.total,
            subscriptionName:req.body.subscriptionName
        });
        await newRecurringPayment.save();
        res.status(200).json({status:true,message:'Recurring payment successfull add',data:newRecurringPayment});
    }catch(err){
    res.status(500).json({ message: err.message })
  }
})

router.get('/',async(req,res) => {
    try{
      await dbConnection.connectToDatabase()
      const recurringPayment = await RecurringPayment.findRecurringPaymentRecord({});
      res.status(200).json({status:true,message: "Recurring payment list successfull retrieved",data:recurringPayment }) 
    }
    catch(err){
      res.status(500).json({ message: err.message })
    }
})
  
router.delete('/:id',async(req,res) => {
  try{
    await dbConnection.connectToDatabase()
    await RecurringPayment.removeRecurringPayment({_id :req.params.id});
    res.status(204).json({status:true,message: "Recurring payment successfully deleted",data:null}) 
  }
  catch(err){
    res.status(500).json({ message: err.message })
  }
})

module.exports = router 
