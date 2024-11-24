const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User schema with fields for name, email, and password
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {
    timestamps: true,
});

// Hash password before saving the user
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        this.password = await bcrypt.hash(this.password, 10); // 10 is the salt rounds
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare passwords during login
UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
