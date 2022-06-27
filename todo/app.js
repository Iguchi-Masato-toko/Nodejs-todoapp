const express = require("express");
const app = express();
const PORT = 4000;
const taskRouter = require('./routs/tasks');
const conenectDB = require('./db/connect');
const path = require('path');
app.use(express.json());

app.use(express.static('./todo/public'))


// const ENV_PATH = path.join('../todo/', '.env');
require('dotenv').config();
app.use('/api/v1/tasks',taskRouter);
const start = async() => {
    try {
        await conenectDB(process.env.MONGO_URL);
        app.listen(process.env.PORT || PORT,console.log("サーバーが起動しました"));
    }catch(err){
        console.log(err);
    }
}
start();