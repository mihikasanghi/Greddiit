const mongoose = require('mongoose')

const subGreddiitSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        }, 
        description: {
            type: String,
            required: true,
        }, 
        bannedKeywords: {
            type: String,
        }, 
        tags: {
            type: String,
        }, 
        owner: {
            type: String,
            required: true,
        }, 
        followers: {
            type: String,
            required: true,
        },
        blocked: {
            type: String,
        },
        posts: {
            type: String,
        },
        requests: {
            type: String,
        }
    },
    {
        timestamps:true,
    }
)

module.exports = mongoose.model('SubGreddiit', subGreddiitSchema)