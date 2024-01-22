import multer from 'multer'
import path from 'path'
import uuid from 'uuid';


// Settings
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, uuid.v4() + path.extname(file.originalname))
    }
});
export default multer({storage});

