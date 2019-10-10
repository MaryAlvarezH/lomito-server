const mongoose = require('mongoose');
const DB_PATH = require('./environment');

// mongodb://localhost:27017/lomito
// mongodb+srv://malvarez:201105@cluster0-azxjy.mongodb.net/test?retryWrites=true&w=majority
// mongodb://malvarez:201105mm@ds050739.mlab.com:50739/lomito
mongoose.connect('mongodb://malvarez:201105mm@ds050739.mlab.com:50739/lomito', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});