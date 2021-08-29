const PORT = process.env.PORT || 5000;
const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();

app.use(cors());
app.use(express.json());






// auth router
app.use('/auth', require("./routes/auth"));
app.use('/api', require("./routes/api"));










app.listen(PORT, ()=>{console.log(`Server started on port ${PORT}`)})