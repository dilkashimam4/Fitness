const router = require("express").Router()
const passport = require("passport");
const { isAuth } = require("../Auth/isAuth");

router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback', async (req, res, next) => {
    passport.authenticate("google", {
        failureRedirect: "/login/api/failed",
        successRedirect: process.env.UI_URL,
        // successMessage: "successfull login",
        // failureMessage: "not login"
    })(req, res, next)
});

router.get("/failed", async (req, res) => {
    try {
        return res.send("failed")
    } catch (err) {
        console.log(err)
        return res.status(500).send("something error occured")
    }
})
router.get("/success", isAuth, async (req, res) => {
    try {
        console.log("user is added", req.user)
        console.log(req.user)
        console.log(req._passport.session)
        return res.status(200).json({ name: req.user.name, pic: req.user.image })
    } catch (err) {
        console.log(err)
        return res.status(500).send("something error occured")
    }
})
router.get("/logout", async (req, res, next) => {
    try {
        req.logOut((err) => {
            if (err) {
                next()
            }
            else {
                return res.send("logout success")
            }
        })

    } catch (err) {
        console.log(err)
        return res.status(500).send("something error occured")
    }
})
module.exports = router