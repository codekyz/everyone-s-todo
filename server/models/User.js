const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// 10자리 salt를 만들고 salt를 이용해서 비밀번호 암호화
const saltRounds = 10;

const userSchema = mongoose.Schema({
  userid: {
    type: String,
    maxlength: 30,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 6,
  },
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    // 공백을 없애주는 역할
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  let user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, callback) {
  let user = this;
  bcrypt.compare(plainPassword, user.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

userSchema.methods.genToken = function (callback) {
  let user = this;
  //jsonwebtoken을 이용해서 Token 생성
  let token = jwt.sign(user._id.toHexString(), "secretToken");
  user.token = token;
  user.save((err, user) => {
    if (err) return callback(err);
    callback(null, user);
  });
};

userSchema.statics.findByToken = function (token, callback) {
  let user = this;

  //토큰을 decode 한다
  jwt.verify(token, "secretToken", (err, decoded) => {
    // 유저 아이디를 이용해서 유저를 찾은 다음에
    // 클라이언트에서 가져온 토큰과 DB에 보관된 토큰이 일치하는지 확인
    user.findOne({ _id: decoded, token: token }, (err, user) => {
      if (err) return callback(err);
      callback(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
