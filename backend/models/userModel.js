const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        fname: {
            type: String,
            required: true,
        }, 
        lname: {
            type: String,
            required: true,
        }, 
        age: {
            type: String,
            required: true,
        }, 
        phno: {
            type: String,
            required: true,
        }, 
        email: {
            type: String,
            required: true,
        }, 
        username: {
            type: String,
            required: true,
            unique: true,
        }, 
        password: {
            type: String,
            required: true,
        },
        followers: {
            type: String,
            required: true,
        },
        following: {
            type: String,
            required: true,
        },
        saved: {
            type: String,
            required: true,
        }
    },
    {
        timestamps:true,
    }
)

module.exports = mongoose.model('User', userSchema)