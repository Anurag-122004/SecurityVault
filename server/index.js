const express = require('express');
const app = express();
const cors = require('cors');
const { MONGODB_URL, PORT}=require('./config/serverConfig');
const authenticationRoute = require('./routes/authenticationRoutes');
const uploadImageRoute = require('./routes/uploadImageRoute');
const getImageRoute = require('./routes/getImageRoute');
const { connectDB }=require('./db/connect');

app.use(cors());
app.use(express.json());

app.use('/api',authenticationRoute);
app.use('/api',uploadImageRoute);
app.use('/api',getImageRoute);

async function serverStart (){
    try {
        await connectDB(MONGODB_URL);
        console.log("Connected to databse")
        app.listen(PORT, () => {
            console.log(`server is running at ${PORT}`);
        });
    }

    catch(error) {
        console.error('Error while starting the server');
        console.error(error);
    }
}

serverStart();
