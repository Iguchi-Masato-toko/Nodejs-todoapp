const mongoose = require("mongoose");

const conenectDB = (url) => {
    return mongoose.connect(url)
    .then(() => {
        console.log("データベースと接続中");
    })
    .catch((err) => {
        console.log(err);
    })
}
module.exports = conenectDB;