const User = require('../models/User');
const jwt = require('jsonwebtoken');

// generate JWT token 
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register a new user
exports.register = async (req, res) => {
    try {
        const {name, email, password, phone, aadharNumber } = req.body;

        // check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // create new user
        const user = new User({
            name, 
            email, 
            password, 
            phone,
            aadharNumber
        });

        await user.save();
        

        // generate JWT token 
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                aadharNumber: user.aadhaarNumber,
                aadharVerified: user.aadharVerified,
                rating: user.rating
            },
            token
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// login user 
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // find user 
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // generate JWT token
        const token = generateToken(user._id);

        res.json({
            success: true,
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                aadharVerified: user.aadharVerified,
                rating: user.rating     
            },
            token
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });        
    }
};

// Get user profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); 
        }
        res.json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update user profile
exports.updateProfile = async (req, res) => {
    try {
        const { name, phone, aadhaarNumber } = req.body; 

        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Update fields
        if (name) user.name = name;
        if (phone) user.phone = phone;
        if (aadhaarNumber) {
            user.aadhaarNumber = aadhaarNumber;
            user.aadharVerified = true; // Assuming verification is done here
        }
        await user.save();

        res.json({
            success: true,
            message: 'Profile updated successfully',
            user: {
                id : user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                aadharVerified: user.aadharVerified,
                rating: user.rating
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};