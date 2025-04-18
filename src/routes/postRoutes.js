const express = require('express');
const { createPost, deletePost, likePost, getAllPosts, getUserPosts, getFeed } = require('../controllers/postController');
const { authenticate } = require('../middleware/authMiddleware');
const { getTrendingTopics } = require('../controllers/postController');

const router = express.Router();

router.post('/', authenticate, createPost);
router.delete('/:postId', authenticate, deletePost);
router.put('/:postId/like', authenticate, likePost);
router.get('/user/:userId', authenticate, getUserPosts);
router.get('/feed', authenticate, getFeed);
router.get('/trending/topics', getTrendingTopics); 
router.get('/', getAllPosts);


module.exports = router;
