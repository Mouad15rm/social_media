const express = require('express'); 
const { authenticate } = require('../middleware/authMiddleware'); 
const { getUser, updateUser, followUser, unfollowUser, getUserFollowers, 
getUserFollowing } = require('../controllers/userController'); 
 
const router = express.Router(); 
 
router.get('/:userId', getUser);  
router.put('/:userId', authenticate, updateUser); 
 
router.put('/:userId/follow', authenticate, followUser); // Suivre un utilisateur  
router.put('/:userId/unfollow', authenticate, unfollowUser); // Ne plus suivre un utilisateur 
router.get('/:userId/followers', getUserFollowers); // Voir la liste des abonnés 
router.get('/:userId/following', getUserFollowing); // Voir la liste des suivis 
 
module.exports = router; 