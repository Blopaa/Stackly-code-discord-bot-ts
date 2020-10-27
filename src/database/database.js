const mongoose = require("mongoose");

const connect = () => {
  const URI = process.env.MONGODB_URI ? process.env.MONGODB_URI : "";

  mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  const conection = mongoose.connection;

  conection.once("open", () => {
    console.log("DB is connected");
  });
};


module.exports = connect