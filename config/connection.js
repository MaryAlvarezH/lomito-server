const mongoose = require('mongoose');
const DB_PATH = require('./environment');

// mongodb://localhost:27017/lomito
mongoose.connect('mongodb+srv://malvarez:201105@cluster0-azxjy.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});