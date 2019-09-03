const express = require("express");
const router = express.Router();
import { getRepository } from "typeorm";
import { User } from "../entity/User";
const jwt = require("jsonwebtoken");
const passport = require("passport");
router.post("/api/login", (req, res, next) => {
  passport.authenticate("login", { session: false }, (err, user, info) => {
    console.log(err, user, info);
    try {
      if (err || !user) {
        const error = new Error("An Error occured");
        return next(error);
      }
      req.login(user, { session: false }, async error => {
        if (error) return next(error);
        //We don't want to store the sensitive information such as the
        //user password in the token so we pick only the email and id
        const body = { id: user.id, email: user.email };
        //Sign the JWT token and populate the payload with the user email and id
        const token = jwt.sign({ user: body }, "top_secret");
        //Send back the token to the user
        return res.json({ token, body });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});
module.exports = router;
