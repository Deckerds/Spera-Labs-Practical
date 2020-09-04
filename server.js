const express = require('express');
const connectDb = require('./config/db');

const app = express();

//Calling the Database Connection
connectDb();

//Calling Middleware
app.use(express.json({ extended: false }));

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
// app.use('/api/products', require('./routes/products'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});