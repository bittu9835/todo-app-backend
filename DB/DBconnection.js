const mongoose = require('mongoose');
const { ENV } = require('../dotenv');

var db_url = `${ENV.DB_HOST}/${ENV.DB_NAME}`;
mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));
