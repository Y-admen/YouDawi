const appError = require("../utils/appError");

module.exports = (...roles) => {    
    return (req, res, next) => {
        if(!roles.includes(req.currentUser.role)) {
            return next(appError.create('Unauthorized', 401))
        }
        next();
    }
}