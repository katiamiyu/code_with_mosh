const genres = require('./routes/genres');
const express = require('express');
const app = express();

// middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/api/genres', genres);

const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`app listening on ${port}`));