var GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../db/UserSchema")


module.exports = async (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.BACKEND_DOMAIN + "/login/api/auth/google/callback",
        passReqToCallback: true
    },
        async function (req, accessToken, refreshToken, profile, done) {
            console.log({ profile, refreshToken, accessToken })
            try {
                //save user of not in db
                // name: { familyName: 'Kumar', givenName: 'Sanju' },
                const userIsExists = await User.findOne({ email: profile._json.email }).exec();
                console.log("email", profile.email)
                if (userIsExists) {
                    return done(null, userIsExists)
                }
                const user = await new User({
                    name: profile.name.givenName,
                    lname: profile.name.familyName,
                    password: profile.id,
                    provider: profile.provider,
                    email: profile._json.email,
                    image: profile._json.picture,
                    verify: profile._json.verify
                })
                await user.save()
                const userFind = await User.findOne({ email: profile._json.email }).exec()
                return done(null, userFind)
            } catch (err) {
                console.log(err)
                console.log("error on the user not save")
                return done(null, false)
            }
        }
    ));
    passport.serializeUser(function (user, done) {
        console.log(`serialize user is ${user}`)
        done(null, user._id);
    });
    passport.deserializeUser(async function (id, done) {
        try {
            const user = await User.findById({ _id: id }).exec();
            console.log(`deserialize user is ${user}`)
            done(null, user);
            console.log({ user })
        } catch (err) {
            console.log("error on deseekice")
            console.log(err)
            done(null, false, { error: err });
        }
    });
}