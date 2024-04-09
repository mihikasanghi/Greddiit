const asyncHandler = require("express-async-handler")
const Post = require('../models/postModel')

const registerPost = asyncHandler(async (req, res) => {
    const { text, postedBy, postedIn, } = req.body

    const post = await Post.create({
        text,
        postedBy,
        postedIn,
        upvotes: "[]",
        downvotes: "[]",
    })

    if (post) {
        res.status(201).json({
            _id: post._id,
            text: post.text,
            postedBy: post.postedBy,
            postedIn: post.postedIn,
            upvotes: post.upvotes,
            downvotes: post.downvotes,
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid post data')
    }
})

const getPosts = asyncHandler(async (req, res) => {

    const {name} = req.body
    Post.find({ 'postedIn': name }, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).json(data)
        }
    })
})

const deleteSubGredPosts = asyncHandler(async (req, res) => {

    const { postedIn } = req.params
    try {
        await Post.deleteMany({ postedIn })
    } catch (error) {
        console.log(error)
    }
    res.status(200).json("Deletion complete")
})

const upvote = asyncHandler(async (req, res) => {

    const post = await Post.findById(req.params.id)
    const { username } = req.body

    const upvotesArr = JSON.parse(post.upvotes)
    const downvotesArr = JSON.parse(post.downvotes)

    if(!upvotesArr.includes(username)) {
        upvotesArr.push(username)
        await Post.findByIdAndUpdate(req.params.id, { upvotes: JSON.stringify(upvotesArr) })
    }
    let finalArr
    if (downvotesArr.includes(username)) {
        finalArr = downvotesArr.filter(e => e !== username)
        await Post.findByIdAndUpdate(req.params.id, { downvotes: JSON.stringify(finalArr) })
    }

    const updated = await Post.findById(req.params.id)
    res.status(201).json(updated)

})

const downvote = asyncHandler(async (req, res) => {

    const post = await Post.findById(req.params.id)
    const { username } = req.body

    const downvotesArr = JSON.parse(post.downvotes)
    const upvotesArr = JSON.parse(post.upvotes)

    if(!downvotesArr.includes(username)) {
        downvotesArr.push(username)
        await Post.findByIdAndUpdate(req.params.id, { downvotes: JSON.stringify(downvotesArr) })
    }
    let finalArr
    if (upvotesArr.includes(username)) {
        finalArr = upvotesArr.filter(e => e !== username)
        await Post.findByIdAndUpdate(req.params.id, { upvotes: JSON.stringify(finalArr) })
    }

    const updated = await Post.findById(req.params.id)
    res.status(201).json(updated)

})

const getOnePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.body.id)
    res.status(200).json(post)
})

const getMultiplePosts = asyncHandler(async (req, res) => {
    const { savedPostsId } = req.body

    const posts = await Post.find({ _id: { $in: savedPostsId } })
    res.status(200).json(posts)
})

module.exports = {
    registerPost,
    getPosts,
    deleteSubGredPosts,
    upvote,
    downvote,
    getOnePost,
    getMultiplePosts,
}