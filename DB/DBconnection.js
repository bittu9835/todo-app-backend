const mongoose = require('mongoose');

var db_url = 'mongodb://127.0.0.1:27017/todo-app';
mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));
