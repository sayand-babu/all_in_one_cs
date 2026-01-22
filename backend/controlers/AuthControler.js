const axios = require("axios");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

/* =========================
   STEP 1: START GOOGLE LOGIN
========================= */
exports.googleAuth = (req, res) => {
  const googleAuthUrl =
    "https://accounts.google.com/o/oauth2/v2/auth" +
    "?response_type=code" +
    `&client_id=${process.env.GOOGLE_CLIENT_ID}` +
    `&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}` +
    "&scope=openid email profile";

  res.redirect(googleAuthUrl);
};

/* =========================
   STEP 2: GOOGLE CALLBACK
========================= */
exports.googleCallback = async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send("No authorization code received");
  }

  try {
    const tokenRes = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      }
    );

    const { id_token } = tokenRes.data;

    const payload = jwt.decode(id_token);
    const { sub, email, name, picture } = payload;

    let user = await User.findOne({
      provider: "google",
      providerUserId: sub,
    });

    if (!user) {
      user = await User.create({
        provider: "google",
        providerUserId: sub,
        email,
        name,
        avatar: picture,
      });
    }

    user.lastLoginAt = new Date();
    await user.save();

    const appToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("access_token", appToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // true in prod
    });

    res.redirect("http://localhost:5173/contests");

  } catch (err) {
    console.error(err);
    res.status(500).send("Google authentication failed");
  }
};

/* =========================
   STEP 3: CHECK LOGIN STATUS
========================= */
exports.getMe = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ loggedIn: false });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-__v");

    if (!user) {
      return res.status(401).json({ loggedIn: false });
    }

    res.json({ loggedIn: true, user });
  } catch {
    res.status(401).json({ loggedIn: false });
  }
};

/* =========================
   STEP 4: LOGOUT
========================= */
exports.logout = (req, res) => {
  res.clearCookie("access_token");
  res.json({ success: true });
};
  