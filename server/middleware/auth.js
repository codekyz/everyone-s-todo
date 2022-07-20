const { User } = require("../models/User");

let auth = (req, res, next) => {
  // 인증처리를 하는 곳

  // 클라이언트 쿠키에서 토큰을 가져옴
  let token = req.cookies.x_auth;

  // 토큰을 복호화한 후 유저를 찾음
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    req.token = token;
    req.user = user;
    // 이후에 사용할 수 있게 하기 위해 req에 넣어줌
    next();
  });
  // 유저가 있으면 인증 OK
  // 유저가 없으면 인증 NO
};

module.exports = { auth };
