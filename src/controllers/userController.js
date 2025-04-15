const User = require('../models/User');

exports.getUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).select('-password');
        if (!user) return res.status(404).json({ error: 'Utilisateur introuvable' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { username, avatar } = req.body;
        const user = await User.findByIdAndUpdate(userId, { username, avatar }, { new: true });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

exports.followUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const currentUserId = req.user.userId;

        if (userId === currentUserId) return res.status(400).json({ error: 'Vous ne pouvez pas vous suivre vous-même' });

        const userToFollow = await User.findById(userId);
        const currentUser = await User.findById(currentUserId);

        if (!userToFollow || !currentUser) return res.status(404).json({ error: 'Utilisateur introuvable' });

        if (currentUser.following.includes(userId)) return res.status(400).json({ error: 'Vous suivez déjà cet utilisateur' });

        currentUser.following.push(userId);
        userToFollow.followers.push(currentUserId);

        await currentUser.save();
        await userToFollow.save();

        res.json({ message: 'Utilisateur suivi avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

exports.unfollowUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const currentUserId = req.user.userId;

        const userToUnfollow = await User.findById(userId);
        const currentUser = await User.findById(currentUserId);

        if (!userToUnfollow || !currentUser) return res.status(404).json({ error: 'Utilisateur introuvable' });

        currentUser.following = currentUser.following.filter(id => id.toString() !== userId);
        userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== currentUserId);

        await currentUser.save();
        await userToUnfollow.save();

        res.json({ message: 'Utilisateur désuivi avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

exports.getUserFollowers = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('followers', 'username avatar');
        if (!user) return res.status(404).json({ error: 'Utilisateur introuvable' });
        res.json(user.followers);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

exports.getUserFollowing = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('following', 'username avatar');
        if (!user) return res.status(404).json({ error: 'Utilisateur introuvable' });
        res.json(user.following);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};
