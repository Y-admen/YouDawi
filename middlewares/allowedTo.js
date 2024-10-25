const appError = require("../utils/appError");
// This middleware checks if the user is allowed to access the route
module.exports = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.currentUser.role)) {
            return next(appError.create('Unauthorized', 401))
        }
        next();
    }
}
