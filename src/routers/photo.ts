import { Router } from 'express'
const router = Router();

import upload from '../libs/multer'
import { createPhoto, deletePhoto, getPhoto, getPhotos, updatePhoto } from '../controllers/photo';
//import { getPhotos, createPhoto, deletePhoto, getPhoto, updatePhoto } from '../controllers/photo.controller'


// middleware
// router.use(upload.single('image'));

router.route('/photos')
       .get(getPhotos)
       .post(upload.single('image'), createPhoto);


router.route('/photos/:id')
      .get(getPhoto)
      .put(updatePhoto)
      .delete(deletePhoto)
//    */

export default router;