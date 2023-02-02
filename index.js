const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5050;
const cors = require('cors');

const wordRoutes = require('./routes/wordsRoute');

//Middleware
app.use(express.json());
app.use(cors());

app.use('/words', wordRoutes);

app.listen(PORT, () => {
	console.log(`🚀 Server running at http://localhost:${PORT}`);
});
