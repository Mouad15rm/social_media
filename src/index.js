require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const authRoutes = require('./routes/authRoutes');
 
// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log(' MongoDB connecté'))
.catch(err => console.error(' Erreur de connexion à MongoDB:', err));
// Middlewares
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
// Routes

app.use('/api/auth', authRoutes);
// Test route

const postRoutes = require('./routes/postRoutes');  
app.use('/api/posts', postRoutes);

app.get('/', (req, res) => {
    res.send('Bienvenue sur l’API du réseau social !');
});
const commentRoutes = require('./routes/commentRoutes') 
app.use('/api/comments', commentRoutes);

// Start server
app.listen(PORT, () => console.log(` Serveur démarré sur le port ${PORT}`));

