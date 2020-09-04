//DB Connection Configuration
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDb = () => {
    try {
        mongoose.connect(db, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.log('ERROR:' + err.message);
        process.exit(1);
    }
};

module.exports = connectDb;
