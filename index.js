const PORT = process.env.PORT || 5000;
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(cors());
app.use(express.json());



app.use(express.static(path.join(__dirname, 'frontend/build')));

// auth router
app.use('/auth', require("./routes/auth"));
app.use('/api', require("./routes/api"));


app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/frontend/build/index.html'));
});







app.listen(PORT, ()=>{console.log(`Server started on port ${PORT}`)})