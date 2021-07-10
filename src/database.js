import mongoose from "mongoose";
const URI = process.env.MONGODB_URI
  ? process.env.MONGODB_URI
  : "mongodb://localhost/database_bunkey";

//iniciar mongo con "mongod"

console.log(URI);
mongoose.connect(URI, {
  //URLSearchParams:true,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("DB is connected");
});
