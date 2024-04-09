const express = require("express")
const router = express.Router()
const { registerPost, getPosts, deleteSubGredPosts, upvote, downvote, getOnePost, getMultiplePosts } = require("../controllers/postController.js")

// const { protect } = require("../middleware/authMiddleware")
// router.get('/', getGoals)
router.post('/', registerPost)
router.post('/allPosts', getPosts)
router.delete('/:postedIn', deleteSubGredPosts)
router.post('/upvote/:id', upvote)
router.post('/downvote/:id', downvote)
router.post('/post', getMultiplePosts)

// router.post('/login', loginUser)
// router.get('/me', protect, getMe)
// router.put('/updateUser', updateUser)

module.exports = router