const mongoose = require("mongoose");
var logger = require('./config/winston');

// const db = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/admin`;

const db = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_INITDB_HOST}:${process.env.MONGO_INITDB_HOST}/admin`;


module.exports = mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("MongoDB Connected")
    logger.info(`MongoDb connection Established succesfully`)
  })
  .catch(err => {
    console.log(err);
    logger.error(`Failed establishing connection with mongoDB due to: ` + err);
  });


  