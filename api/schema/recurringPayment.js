var mongoose = require('mongoose');

var recurringPaymentSchema = new mongoose.Schema({
    total:{
        type: Number,
        required: [true , 'Total required!']
    },
    subscriptionName:{
        type: String ,
        required: [true , 'Total required!']
    }
})


recurringPaymentSchema.statics.findAllRecurringPayment = async (data) => {
    const recurringPayment = await RecurringPayment.find(data)
    if(recurringPayment.length > 0) {
        return recurringPayment
    }
    return null
}

recurringPaymentSchema.statics.findRecurringPaymentRecord = async (data) => {
    const recurringPayment = await RecurringPayment.find(data)
    if(recurringPayment.length > 0) {
        return recurringPayment
    }
    return null
}

recurringPaymentSchema.statics.removeRecurringPayment = async (data) => {
    const recurringPayment = await RecurringPayment.deleteOne(data)
    if(recurringPayment) {
        return  recurringPayment
    }
    return null
}
const RecurringPayment = mongoose.model('RecurringPayment', recurringPaymentSchema)

module.exports = RecurringPayment
