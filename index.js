const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5050;
const cors = require('cors');

//Routes
const wordRoutes = require('./routes/wordsRoute');
const userRoutes = require('./routes/userRoute');
const gameRoutes = require('./routes/gameRoute');
const questionRoutes = require('./routes/questionRoute');

//Middleware
app.use(express.json());
app.use(cors());

app.use('/words', wordRoutes);
app.use('/users', userRoutes);
app.use('/games', gameRoutes);
app.use('/questions', questionRoutes);

app.listen(PORT, () => {
	console.log(`🚀 Server running at http://localhost:${PORT}`);
});
