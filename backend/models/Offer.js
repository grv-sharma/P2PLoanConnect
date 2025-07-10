const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({

    loan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Loan',
        required: true
    },
    lender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 1000,
    },
    interestRate: {
        type: Number,
        required: true,
        min: 8,
        max: 30
    },
    message : {
        type: String,
        maxlength: 500
    },
    status: {
        type: String,
        enum : ['pending', 'accepted', 'rejected', 'expired'],
        default: 'pending'
    },
    expiresAt: {
        type: Date,
        default: function() {
            return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
        }
    },
    acceptedAt: Date,
    rejectedAt: Date,
    
    terms : {
        processingFee: {
            type: Number,
            default: 0,
        },
        latePaymentFee: {
            type: Number,
            default: 0,
        },
        prepaymentAllowed: {
            type: Boolean,
            default: true,
        },
        collateralRequired: {
            type: Boolean,
            default: false,
        }
    }
}, {
    timestamps: true
});

offerSchema.index({ loan: 1, status: 1 }); 
offerSchema.index({ lender: 1, status: 1 });
offerSchema.index({ expiresAt: 1 }); 

// expire old offers 
offerSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Offer', offerSchema);