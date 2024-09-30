/*
function middle ware to check the logged in or not 
*/
function checkAuthentication(req, res, next) {
    if (!req.session.loggedIn) {
      return res.redirect('/login'); 
    }
    else {
      next()
    };
  }
  
module.exports = checkAuthentication;
  