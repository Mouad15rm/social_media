const mongoose = require('mongoose'); 
 
const PostSchema = new mongoose.Schema({ 
    content: { type: String, required: true }, // Contenu du post 
    image: { type: String }, // URL de l'image (optionnelle) 
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Référence à l'auteurx 
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Liste des utilisateurs ayant liké 
}, { timestamps: true }); 
 
module.exports = mongoose.model('Post', PostSchema); 