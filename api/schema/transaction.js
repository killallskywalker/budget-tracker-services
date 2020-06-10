var mongoose = require('mongoose');

var transactionSchema = new mongoose.Schema({
    month :{
        type: String,
        required: [true , 'Month required!']
    },
    recurringPayment:[{
        subscriptionName:{
            type:String
        },
        total:{
            type:Number
        }
    }],
    transaction: [{
        transactionType:{
            type:String,
            required: [true , 'Transaction required!']
        },
        category : {
            type: String,
            default : "General Expenses"
        },
        memo : {
            type: String,
            default: null
        },
        date: {
            type: String,
            required: [true , 'Date required!']
        },
        total: {
            type: Number ,
            required: [true , 'Total required!']
        }
    }]
})

transactionSchema.statics.findTransactionRecord = async (data) => {
    const transaction = await Transaction.find(data)
    if(transaction.length > 0) {
        return transaction
    }
    return null
}

transactionSchema.statics.addDailyTransactionRecord = async (idObject,query) => {
    const transaction = await Transaction.findByIdAndUpdate(idObject,query,{new:true})
    if(transaction) {
        return transaction
    }
    return null
}

transactionSchema.statics.findDailyTransactionRecord = async (idObject,totalObject) => {
    const transaction = await Transaction.findOne(idObject,totalObject)
    if(transaction) {
        return transaction
    }
    return null
}

transactionSchema.statics.removeDailyTransactionRecord = async (transactionId,query) => {
    const transaction = await Transaction.findByIdAndUpdate(transactionId,query,{new:true})
    if(transaction) {
        return transaction
    }
    return null
}

transactionSchema.statics.updateDailyTransactionRecord = async (transactionId,query) => {
    const transaction = await Transaction.findByIdAndUpdate(transactionId,query,{new:true})
    if(transaction) {
        return transaction
    }
    return null
}


const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction
