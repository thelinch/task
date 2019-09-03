const bcrypt = require("bcrypt");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
import { getRepository } from "typeorm";
import { User } from "../entity/User";
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
var opts: any = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken("JWT");
opts.secretOrKey = "secret";
opts.issuer = "accounts.examplesoft.com";
opts.audience = "yoursite.net";
passport.use(
  "register",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password", session: false },
    async (email, password, done) => {
      try {
        const userRepository = getRepository(User);
        let userLoged = await userRepository.findOne({
          where: { email: email }
        });
        return done(null, userLoged);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false
    },
    async (email, password, done) => {
      const userRepository = getRepository(User);
      let userLoged = await userRepository.findOne({
        where: { email: email }
      });
      if (!userLoged) {
        return done(null, false, { message: "bad username" });
      }
      console.log("entro", userLoged);
      return done(null, userLoged, { message: "logged in succ" });
    }
  )
);
passport.use(
  "jwt",
  new JWTStrategy(opts, async (jwt_payload, done) => {
    try {
      const userRepository = getRepository(User);
      const userLoged = await userRepository.findOne({
        where: { id: jwt_payload.id }
      });
      done(null, userLoged);
    } catch (error) {
      done(error);
    }
  })
);
module.exports = passport;
