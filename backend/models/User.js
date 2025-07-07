const mongoose = require('mongoose');
const bcrypt    = require('bcryptjs');

// User schema definition
// This schema defines the structure of user documents in the MongoDB database
// It includes fields for user information, security, and activity tracking
// Each field has specific validation rules and default values where applicable
// The schema also includes pre-save middleware to hash passwords before storing them
// and a method to compare passwords for authentication purposes 

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    },
    Phone: {
        type: String,
        required: true,,
    },
    aadharNumber: {
        type: String,
        required: true,
        unique: true,
        sparse: true,
    },
    aadharVerified: {
        type: Boolean,
        default: false,
    },
    creditScore: {
        type: Number,
        default: 0,
    },
    totalLent: {
        type: Number,
        default: 0,
    },
    totalBorrowed: {
        type: Number,
        default: 0,
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    profilePicture: {
        type: String,
        default: 'https://example.com/default-profile-picture.png'
    },
    isActive: {
        type: Boolean,
        default: true,
    },{
        timestamps: true
    });
    
// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// export the user model
module.exports = mongoose.model('user', userSchema);
