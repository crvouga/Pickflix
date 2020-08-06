const express = require("express");
const router = express.Router();
const admin = require("../firebaseAdmin");
const authenticated = require("../middlewares/authenticated");

const env = process.env.NODE_ENV || "development";
const sessionCookieExpiresIn = 1000 * 60 * 60 * 24 * 14; // 2 weeks
const sessionCookieOptions =
  env === "development" || true //turn off sercurity
    ? {
        maxAge: sessionCookieExpiresIn,
        httpOnly: false,
        secure: false,
        domain: null,
      }
    : {
        maxAge: sessionCookieExpiresIn,
        httpOnly: true,
        secure: true,
      };

router.post("/signIn", async (req, res) => {
  try {
    const idToken = req.body.idToken;
    const sessionCookie = await admin.auth().createSessionCookie(idToken, {
      expiresIn: sessionCookieExpiresIn,
    });
    res.cookie("session", sessionCookie, sessionCookieOptions);
    res.json({ status: "success" });
  } catch (error) {
    res.status(401);
    res.json({ status: "error", error });
  }
});

router.post("/signOut", async (req, res) => {
  res.clearCookie("session");
  res.json({ status: "success" });
});

router.get("/user", authenticated, (req, res) => {
  res.json({ user: req.user });
});

router.delete("/user", authenticated, async (req, res) => {
  try {
    const uid = req.user.uid;
    await admin.auth().deleteUser(uid);
    res.json({ status: "success", message: "User was successfully deleted" });
  } catch (error) {
    res.json({ status: "error", error });
  }
});

module.exports = router;
