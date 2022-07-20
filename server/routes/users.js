const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/auth");
const { User } = require("../models/User");

router.post("/createaccount", (req, res) => {
  // 회원 가입할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어줌
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
      doc,
    });
  });
});

router.post("/login", (req, res) => {
  // 요청된 이메일을 데이터베이스에서 있는지 찾음
  User.findOne({ userid: req.body.userid }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
    // 요청된 이메일이 데이터베이스에 있는지 비밀번호가 맞는지 확인

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      }

      // 비밀번호까지 맞다면 토큰을 생성
      user.genToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 저장(로컬, 쿠키 등)
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, id: user._id });
      });
    });
  });
});

router.get("/auth", auth, (req, res) => {
  // auth = 미들웨어
  // 여기까지 미들웨어를 통과해 왔다는 것은 authentication이 ture라는 말

  res.status(200).json({
    _id: req.user._id,
    userid: req.user.userid,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
      user,
    });
  });
});

module.exports = router;
