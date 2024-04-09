const express = require("express")
const router = express.Router()
const { registerSubGreddiit,
        getAllSubGreddiit,
        deleteSubGred,
        getSubGreddiit,
        getOne,
        addFollowerToSubGreddiit,
        sendRequest,
        rejectRequest,
        removeFollower,
        blockFollower } = require("../controllers/subGreddiitController")

// const { protect } = require("../middleware/authMiddleware")

router.post('/', registerSubGreddiit)
router.post('/mySubGreddiits', getAllSubGreddiit)
router.delete('/:name', deleteSubGred)
router.get('/', getSubGreddiit)
router.get('/:name', getOne)
router.post('/addFollower/subGreddiit', addFollowerToSubGreddiit)
router.post('/request', sendRequest)
router.post('/reject', rejectRequest)
router.post('/block', blockFollower)
router.post('/remove', removeFollower)


module.exports = router