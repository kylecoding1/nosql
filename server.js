const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost/socialnetwork', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/users', require('./routes/api/users'));
app.use('/api/thoughts', require('./routes/api/thoughts'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
