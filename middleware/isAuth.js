const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const sha256 = require('sha256');
const User = require("../model/User")


exports.isAuth = (req, res, next) => {
    const user = req.session.user;
    if (user) {
        user.status >= 2 ? next() : res.redirect(process.env.CLIENT_URI);
    } else {
        res.redirect(process.env.CLIENT_URI);
    }
};

exports.isAuths = passport.authenticate('local', {
        successMessage: 'Authentication successful',
        failureRedirect: process.env.CLIENT_URI + '/login'
    })

passport.use(new LocalStrategy((username,password, done) =>{
    const filter = {username: username, password: sha256(password)};
    User.find(filter).then((user) => {
        if(user){
            done(null,user);
        } else {
           done(null,false);
        }
    })
}))

passport.serializeUser((user,done)=> done(null,user));

passport.deserializeUser((user,done)=>{
    if(user != ''){
        done(null,user);
    } else {
        done(null,false);
    }
});