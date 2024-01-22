"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const multer_1 = __importDefault(require("../libs/multer"));
const photo_1 = require("../controllers/photo");
//import { getPhotos, createPhoto, deletePhoto, getPhoto, updatePhoto } from '../controllers/photo.controller'
// middleware
// router.use(upload.single('image'));
router.route('/photos')
    .get(photo_1.getPhotos)
    .post(multer_1.default.single('image'), photo_1.createPhoto);
router.route('/photos/:id')
    .get(photo_1.getPhoto)
    .put(photo_1.updatePhoto)
    .delete(photo_1.deletePhoto);
//    */
exports.default = router;
//# sourceMappingURL=photo.js.map