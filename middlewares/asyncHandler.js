//we can replace it later with the 'express-async-handler' package
module.exports = (asyncFn) => {
    return (req, res, next) => {
        asyncFn(req, res, next).catch((err) => {
            next(err);
        });
    }
} 
