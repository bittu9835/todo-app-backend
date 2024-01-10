const express = require('express');
const app = express();
const { ENV } = require('./dotenv');

const cors = require('cors')
// JSON convert and process
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// database connection
require('./DB/DBconnection')


app.use('/api', require('./Apis/Api'))
app.use('/uploads', express.static('./uploads'));

app.listen(ENV.APP_PORT, () => {
    console.log(`app is running on port ${ENV.APP_PORT}`)
})