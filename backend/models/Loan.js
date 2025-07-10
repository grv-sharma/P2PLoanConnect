const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
    borrower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount : {
        type: Number,
        required: true,
        min: 1000,
        max : 1000000
    },
    purpose: {
        type: String,
        required: true,
        enum: ['Medical Emergency', 'Education', 'Home Renovation', 'Business Expansion', 'Debt Consolidation', 'Other']
    },
    description : {
        type: String,
        required: true,
        maxlength: 500
    },
    duration: {
        type : Number, //in months 
        required: true,
        min: 1,
        max: 60
    },
    interestRate: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    status : {
        type: String,
        required: true,
        enum: ['Active', 'Funded', 'Repaid', 'Defaulted', 'Cancelled', 'Pending'],
        default: 'Active'
    },
    totalOffers : {
        type: Number,
        default: 0
    },
    fundedAmount: {
        type: Number,
        default: 0
    },
    repaymentSchedule: [{
        dueDate: Date,
        amount: Number,
        status: {
            type: String,
            enum: ['Pending', 'Paid', 'Overdue'],
            default: 'Pending'
        },
        paidDate: Date,
        paidAmount: {
            type: Number,
            default: 0
        }],
        documents : [{
            type: String, // URL or path to the document
            name : String,
            uploadedAt: {
                type: Date,
                default: Date.now
            }
        }],
        tags :[String]
    }, {
        timestamps: true,
    });

// index for searching
loanSchema.index({ purpose: 1, status: 1, amount: 1});
loanSchema.index({borrower: 1, status: 1});


module.exports = mongoose.model('Loan', loanSchema);
