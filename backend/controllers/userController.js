const asyncHandler = require("express-async-handler")
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


// desc = Register new user
// route = POST /api/user
// access = Public
const registerUser = asyncHandler(async (req, res) => {
    const { fname, lname, age, phno, email, username, password } = req.body

    if (!fname || !lname || !age || !phno || !email || !username || !password) {
        res.status(400)
        throw new Error('Please fill all fields')
    }

    //check if user exists
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user
    const user = await User.create({
        fname,
        lname,
        age,
        phno,
        email,
        username,
        password: hashedPassword,
        followers: "[]",
        following: "[]",
        saved: "[]",
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            fname: user.fname,
            lname: user.lname,
            age: user.age,
            phno: user.phno,
            email: user.email,
            username: user.username,
            followers: user.followers,
            following: user.following,
            saved: user.saved,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// desc = Login user
// route = POST /api/user/login
// access = Public
const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    //check for user email
    const user = await User.findOne({ username })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            username: user.username,
            token: generateToken(user._id)

        })
    }
    else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// desc = Get user data
// route = GET /api/user/me
// access = Private
const getMe = asyncHandler(async (req, res) => {
    const { _id, fname, lname, age, phno, email, username, followers, following, saved } = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        fname,
        lname,
        age,
        phno,
        email,
        username,
        followers,
        following,
        saved
    })
})

//generate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

const updateUser = asyncHandler(async (req, res) => {
    let { fname, lname, age, phno, email, username, password } = req.body
    await User.findOneAndUpdate({ username }, {
        fname: fname,
        lname: lname,
        age: age,
        phno: phno,
        email: email,
        username: username,
        password: password
    })
    res.status(200)
})

const addFollowerToUser = asyncHandler(async (req, res) => {

    const { username, newFollower } = req.body
    const user = await User.findOne({ username })
    const newFollowerArr = JSON.parse(user.followers)
    if (!newFollowerArr.includes(newFollower)) {
        newFollowerArr.push(newFollower)
    }
    const updated = await User.findOneAndUpdate({ username }, { followers: JSON.stringify(newFollowerArr) })
    res.status(201).json(updated)

})

const addFollowingToUser = asyncHandler(async (req, res) => {

    const { username, newFollowing } = req.body
    const user = await User.findOne({ username })
    const newFollowingArr = JSON.parse(user.following)
    if (!newFollowingArr.includes(newFollowing)) {
        newFollowingArr.push(newFollowing)
    }
    const updated = await User.findOneAndUpdate({ username }, { following: JSON.stringify(newFollowingArr) })
    res.status(201).json(updated)

})

const removeFollowerFromUser = asyncHandler(async (req, res) => {

    const { username, delFollower } = req.body
    const user = await User.findOne({ username })
    let newFollowerArr = JSON.parse(user.followers)
    if (newFollowerArr.includes(delFollower)) {
        newFollowerArr = newFollowerArr.filter(e => e !== delFollower)
    }
    const updated = await User.findOneAndUpdate({ username }, { followers: JSON.stringify(newFollowerArr) })
    res.status(201).json(updated)

})

const removeFollowingFromUser = asyncHandler(async (req, res) => {

    const { username, delFollowing } = req.body
    const user = await User.findOne({ username })
    let newFollowingArr = JSON.parse(user.following)
    if (newFollowingArr.includes(delFollowing)) {
        newFollowingArr = newFollowingArr.filter(e => e !== delFollowing)
    }
    const updated = await User.findOneAndUpdate({ username }, { following: JSON.stringify(newFollowingArr) })
    res.status(201).json(updated)

})

const addPostToSaved = asyncHandler(async (req, res) => {

    const { username, postId } = req.body
    const user = await User.findOne({ username })
    const newSavedArr = JSON.parse(user.saved)

    newSavedArr.push(postId)

    const updated = await User.findOneAndUpdate({ username }, { saved: JSON.stringify(newSavedArr) })
    res.status(201).json(updated)

})

const removePostFromSaved = asyncHandler(async (req, res) => {

    const { username, postId } = req.body
    const user = await User.findOne({ username })
    let newSavedArr = JSON.parse(user.saved)
    if (newSavedArr.includes(postId)) {
        newSavedArr = newSavedArr.filter(e => e !== postId)
    }
    const updated = await User.findOneAndUpdate({ username }, { saved: JSON.stringify(newSavedArr) })
    res.status(201).json(updated)

})


module.exports = {
    registerUser,
    loginUser,
    getMe,
    updateUser,
    addFollowerToUser,
    addFollowingToUser,
    removeFollowerFromUser,
    removeFollowingFromUser,
    addPostToSaved,
    removePostFromSaved,
}