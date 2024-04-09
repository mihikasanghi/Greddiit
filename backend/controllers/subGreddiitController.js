const asyncHandler = require("express-async-handler")
const SubGreddiit = require('../models/subGreddiitModel')
// const jwt = require('jsonwebtoken')
// const { findOne } = require("../models/subGreddiitModel")

const registerSubGreddiit = asyncHandler(async (req, res) => {
    const { name, description, bannedKeywords, tags, owner } = req.body

    const subGreddiitExists = await SubGreddiit.findOne({ name })

    if (subGreddiitExists) {
        res.status(400)
        throw new Error('Sub Greddiit already exists')
    }

    const subGreddiit = await SubGreddiit.create({
        name,
        description,
        bannedKeywords,
        tags,
        owner,
        followers: `[${JSON.stringify(owner)}]`,
        blocked: "[]",
        posts: "[]",
        requests: "[]",
    })

    if (subGreddiit) {
        res.status(201).json({
            _id: subGreddiit._id,
            name: subGreddiit.name,
            description: subGreddiit.description,
            bannedKeywords: subGreddiit.bannedKeywords,
            tags: subGreddiit.tags,
            owner: subGreddiit.owner,
            blocked: subGreddiit.blocked,
            followers: subGreddiit.followers,
            posts: subGreddiit.posts,
            requests: subGreddiit.requests,
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const getAllSubGreddiit = asyncHandler(async (req, res) => {
    const { owner } = req.body
    SubGreddiit.find({ owner }, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).json(data)
        }
    })
})

const deleteSubGred = asyncHandler(async (req, res) => {

    const { name } = req.params
    try {
        await SubGreddiit.findOneAndRemove({ name })
    } catch (error) {
        console.log(error)
    }
    res.status(200).json("Deletion complete")
})

const getSubGreddiit = asyncHandler(async (req, res) => {

    SubGreddiit.find((err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).json(data)
        }
    })
})

const getOne = asyncHandler(async (req, res) => {

    const { name } = req.params
    const subGred = await SubGreddiit.findOne({ name })
    res.status(200).json(subGred)

})

const addFollowerToSubGreddiit = asyncHandler(async (req, res) => {

    const { name, newFollower } = req.body
    const subGred = await SubGreddiit.findOne({ name })
    let newFollowerArr = JSON.parse(subGred.followers)
    if (!newFollowerArr.includes(newFollower)) {
        newFollowerArr.push(newFollower)
    }
    const updated = await SubGreddiit.findOneAndUpdate({ name }, { followers: JSON.stringify(newFollowerArr) })
    res.status(201).json(updated)

})

const sendRequest = asyncHandler(async (req, res) => {

    const { name, requestedBy } = req.body
    const subGred = await SubGreddiit.findOne({ name })
    const newRequestsArr = JSON.parse(subGred.requests)
    if (!newRequestsArr.includes(requestedBy)) {
        newRequestsArr.push(requestedBy)
    }
    const updated = await SubGreddiit.findOneAndUpdate({ name }, { requests: JSON.stringify(newRequestsArr) })
    res.status(201).json(updated)

})

const rejectRequest = asyncHandler(async (req, res) => {

    const { name, remove } = req.body
    const subGreddiit = await SubGreddiit.findOne({ name })
    const newRequestArr = JSON.parse(subGreddiit.requests)
    let finalArr
    if (newRequestArr.includes(remove)) {
        console.log("helo")
        finalArr = newRequestArr.filter(e => e !== remove)
    }
    const updated = await SubGreddiit.findOneAndUpdate({ name }, { requests: JSON.stringify(finalArr) })
    res.status(201).json(updated)
})

const blockFollower = asyncHandler(async (req, res) => {

    const { name, blockFollower } = req.body
    const subGred = await SubGreddiit.findOne({ name })
    let newBlockedArr = JSON.parse(subGred.blocked)
    if (!newBlockedArr.includes(blockFollower)) {
        newBlockedArr.push(blockFollower)
    }
    const updated = await SubGreddiit.findOneAndUpdate({ name }, { blocked: JSON.stringify(newBlockedArr) })
    res.status(201).json(updated)

})

const removeFollower = asyncHandler(async (req, res) => {

    const { name, remove } = req.body
    const subGreddiit = await SubGreddiit.findOne({ name })
    const newFollowerArr = JSON.parse(subGreddiit.followers)
    let finalArr
    if (newFollowerArr.includes(remove)) {
        finalArr = newFollowerArr.filter(e => e !== remove)
    }
    const updated = await SubGreddiit.findOneAndUpdate({ name }, { followers: JSON.stringify(finalArr) })
    res.status(201).json(updated)
})


module.exports = {
    registerSubGreddiit,
    getAllSubGreddiit,
    deleteSubGred,
    getSubGreddiit,
    getOne,
    addFollowerToSubGreddiit,
    sendRequest,
    rejectRequest,
    removeFollower,
    blockFollower,
}