const express = require("express")
const router = express.Router()
const { registerUser,
    loginUser,
    getMe,
    updateUser,
    addFollowerToUser,
    addFollowingToUser,
    removeFollowerFromUser,
    removeFollowingFromUser,
    addPostToSaved,
    removePostFromSaved } = require("../controllers/userController")

const { protect } = require("../middleware/authMiddleware")
// router.get('/', getGoals)
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.put('/updateUser', updateUser)
router.post('/followUser', addFollowerToUser)
router.post('/followUser/following', addFollowingToUser)
router.post('/unFollowUser', removeFollowerFromUser)
router.post('/unFollowUser/following', removeFollowingFromUser)
router.post('/save', addPostToSaved)
router.post('/unsave', removePostFromSaved)


module.exports = router