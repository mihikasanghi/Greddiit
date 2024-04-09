const mongoose = require('mongoose')

const postSchema = mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        }, 
        postedBy: {
            type: String,
            required: true,
        }, 
        postedIn: {
            type: String,
            required: true,
        }, 
        upvotes: {
            type: String,
        }, 
        downvotes: {
            type: String,
        },
    },
    {
        timestamps:true,
    }
)

module.exports = mongoose.model('Post', postSchema)