const multer = require('multer');
const appError = require('../utils/appError');

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'pics');
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const role = req.body.role || 'user';
        const fileName = `${role}-${Date.now()}.${ext}`;
        cb(null, fileName);
    }
});

const fileFilter = (req, file, cb) => {
    const imageType = file.mimetype.split('/')[0];
    
    if (imageType === 'image') {
        return cb(null, true);
    } else {
        return cb(appError.create('The file must be an image', 400), false);
    }
};

const upload = multer({
    storage: diskStorage,
    fileFilter
});

module.exports = upload;
