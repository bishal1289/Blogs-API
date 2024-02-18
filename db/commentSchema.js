const mongoose = require('mongoose')
const { Schema } = mongoose;

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required:true
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref : 'blog'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref:'User'
    }
}, { timeseries: true })

module.exports = mongoose.model('comment', commentSchema);