const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const socketService = require('../../services/socket.service')
const reviewService = require('./review.service')

async function getReviews(req, res) {
    try {
        const reviews = await reviewService.query(req.query)
        res.send(reviews)
    } catch (err) {
        logger.error('Cannot get reviews', err)
        res.status(500).send({ err: 'Failed to get reviews' })
    }
}

async function deleteReview(req, res) {
    try {
        await reviewService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete review', err)
        res.status(500).send({ err: 'Failed to delete review' })
    }
}


async function addReview(req, res) {
    try {
        var review = req.body
        review.byUserId = req.session.user._id
        review = await reviewService.add(review)
        
        // prepare the updated review for sending out
        review.aboutUser = await userService.getById(review.aboutUserId)
        
        // Give the user credit for adding a review
        var user = await userService.getById(review.byUserId)
        // user.score += 10;DONT NEED
        user = await userService.update(user)
        review.byUser = user
        const fullUser = await userService.getById(user._id)

        console.log('CTRL SessionId:', req.sessionID);
        socketService.broadcast({type: 'review-added', data: review, userId: review.byUserId})
        socketService.emitToUser({type: 'review-about-you', data: review, userId: review.aboutUserId})
        socketService.emitTo({type: 'user-updated', data: fullUser, label: fullUser._id})

        res.send(review)

    } catch (err) {
        console.log(err)
        logger.error('Failed to add review', err)
        res.status(500).send({ err: 'Failed to add review' })
    }
}

module.exports = {
    getReviews,
    deleteReview,
    addReview
}