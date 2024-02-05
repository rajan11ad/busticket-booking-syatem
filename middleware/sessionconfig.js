
function AdminSession(req, res, next) {
    if (req.session && req.session.isAdminLoggedIn) {
        next();
    } else {
        res.status(403).render("adminlogin");
    }
}

module.exports = AdminSession;