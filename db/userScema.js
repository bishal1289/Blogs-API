const mongoose = require('mongoose');
const { Schema } = mongoose;
const userScema = new mongoose.Schema({
    email: String,
    password: String,
    // blogs: [{type: Schema.Types.ObjectId, ref: "blog"}]
},{timestamps: true})

const User = mongoose.model('User', userScema);
module.exports = User;