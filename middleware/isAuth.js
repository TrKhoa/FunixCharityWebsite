exports.isAuth = (req, res, next) => {
    const user = req.session.user;
    if (user) {
        user.status === 3 ? next() : res.redirect(process.env.CLIENT_URI);
    } else {
        res.redirect(process.env.CLIENT_URI);
    }
};
