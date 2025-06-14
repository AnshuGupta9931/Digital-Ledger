// middleware/passport.js
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/User.js";
import { Profile } from "../models/Profile.js";
import dotenv from "dotenv";
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          const pro = await Profile.create({
                gender: "",
                dateOfBirth: "",
                about: "",
               contactNumber: "",
        });
          user = await User.create({
            firstName: profile.name.givenName || "Google",
            lastName: profile.name.familyName || "User",
            email: profile.emails[0].value,
            password: process.env.GOOGLE_PASSWORD,
            accountType: "Student",
            image: profile.photos[0].value,
            additionalDetails: pro._id,
          });
        }
       const fullUser = await User.findById(user._id).populate("additionalDetails").exec();
          return done(null, fullUser);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
