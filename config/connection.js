const mongoose = require('mongoose');
const DB_PATH = require('./environment');

mongoose.connect('mongodb://localhost:27017/lomito', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});