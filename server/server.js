const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { pipeline } = require('stream');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Replace direct endpoint with route module
const psychologistRoute = require('./routes/psychologist');
app.use('/api/psychologist', psychologistRoute);

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
