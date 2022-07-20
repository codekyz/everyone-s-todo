const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const config = require("./config/key");

app.use(cors({ origin: "http://localhost:3000" }));

//express에 내장된 body-parser 사용
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // 6버전이상에서 기본적으로 제공
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use("/api/users", require("./routes/users"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Example app listening on port ${port}`));
