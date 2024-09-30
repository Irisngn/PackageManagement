/*
function middle ware to check the logged in or not 
*/
function checkAuthenticationapi(req, res, next) {
    if (!req.session.logged_in) {
        return res.status(401).json({ message: 'User not authorized' });
    }
    else {
        next()
    };
}

module.exports = checkAuthenticationapi;
